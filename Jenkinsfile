// def String COLOR_MAP = [
//   'SUCCESS': 'good',
//   'FAILURE': 'danger',
// ]

pipeline {
  agent {
    kubernetes {
     yaml """
apiVersion: v1
kind: Pod
metadata:
  name: kaniko
spec:
  containers:
    - name: jnlp
      workingDir: /tmp/jenkins
    - name: kaniko
      workingDir: /tmp/jenkins
      image: gcr.io/kaniko-project/executor:debug
      command:
        - /busybox/cat
      tty: true
    - name: helm
      image: alpine/helm:latest
      command:
        - cat
      tty: true
      resources:
        limit:
          memory: '64Mi'
          cpu: '100m'
    - name: aws-cli
      image: amazon/aws-cli:latest
      command: ['/bin/sh', '-c', 'while true; do sleep 30; done;']
      tty: true
      resources:
        limit:
          memory: '64Mi'
          cpu: '100m'
    - name: kubectl
      image: docker.io/bitnami/kubectl
      command:
        - cat
      tty: true
      securityContext:
        runAsUser: 1000
    - name: nodejs
      image: node:alpine
      command:
        - cat
      tty: true

"""
    }
  }

  options {
    skipStagesAfterUnstable()
  }

  environment {
    AWS_ACCOUNT_ID = '940482417673'
    AWS_DEFAULT_REGION = 'eu-north-1'
    IMAGE_REPO_NAME = 'thirdmadman/task-6'
    IMAGE_TAG = 'v1'
    AWS_USER_ECR = """${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com"""
    ECR_REGISTRY = """${AWS_USER_ECR}/${IMAGE_REPO_NAME}"""
    ECR_REGISTRY_URI = """http://${ECR_REGISTRY}"""
    CODE_REPO_URL = 'https://github.com/thirdmadman/nodejs-2023-q2-crud-api.git'
    CODE_REPO_BRANCH = 'task6'
    REGISTRY_CREDENTIAL = 'ecr:eu-north-1:awscred'
  }

  stages {
    stage('Fetch Code') {
      steps {
        git branch: CODE_REPO_BRANCH, url: CODE_REPO_URL
        echo 'Git checkout success'
      }
    }

    stage('Run Unit Tests') {
      steps {
        container('nodejs') {
            script {
              sh 'npm i; npm run test:ci'
            }
        }
        echo 'Run Unit Tests success'
      }
    }

    stage('Run App Bulild') {
      steps {
          container('nodejs') {
            script {
              sh 'npm i; npm run prod:build'
            }
          }
          echo 'Run App Bulild success'
      }
    }

    stage('Build DockerImage with Kaniko and Push to ECR') {
      environment {
        PATH = "/busybox:/kaniko:$PATH"
      }
      steps {
        input 'Do you approve deployment?'
        container(name: 'kaniko', shell: '/busybox/sh') {
          sh """#!/busybox/sh
          pwd;
          echo ${ECR_REGISTRY}:${BUILD_NUMBER};
          ls -li;
          /kaniko/executor --context `pwd`/.docker/ --dockerfile `pwd`/.docker/node.dockerfile --destination ${ECR_REGISTRY}:latest"""
        }
        echo 'Build DockerImage with Kaniko and Push to ECR success'
      }
    }

    stage('Get AWC ECR token') {
      steps {
        container(name: 'aws-cli') {
          script {
              tmp_param = sh (script: """aws ecr get-login-password --region ${AWS_DEFAULT_REGION};""", returnStdout: true).trim()
          }
        }
        echo 'Get AWC ECR token success'
      }
    }

    stage('Add AWS ECR secret via kubectl') {
        steps {
            container('kubectl') {
                  sh 'kubectl get pods -o wide --all-namespaces'
                  sh 'kubectl delete secret my-secret --ignore-not-found;'
                  sh """kubectl create secret docker-registry my-secret --docker-server=${ECR_REGISTRY} --docker-username=AWS --docker-password=${tmp_param}"""
            }
            echo 'Add AWS ECR secret via kubectl success'
        }
    }

    stage('Deploy Helm Chart') {
        steps {
            script {
                container(name: 'helm') {
                    sh """
                    helm list;
                    helm upgrade --install my-crud-api-release ./crud-api-chart/;
                    helm list;
                    """
                }
                echo 'Deploy Helm Chart success'
            }
        }
    }

    stage('Test app is running') {
        steps {
            container(name: 'kubectl') {
              script {
                  clusterIP = sh (script: """kubectl get svc crud -n jenkins -o jsonpath='{.spec.clusterIP}'""", returnStdout: true).trim()
                  appPort = sh (script: """kubectl get svc crud -n jenkins -o jsonpath='{.spec.ports[].port}'""", returnStdout: true).trim()
              }
            }
            script {
                appRootRoute = sh (script: """curl -s ${clusterIP}:${appPort}/api/""", returnStdout: true).trim()
                appUsersRoute = sh (script: """curl -s ${clusterIP}:${appPort}/api/users""", returnStdout: true).trim()
                if (appRootRoute == '{"errors":[{"title":"Resource not found"}]}' && appUsersRoute == '{"data":[]}') {
                    echo 'All good, CRUD API responding'
                } else {
                    echo 'Test CRUD API FAILED, response results unmatch'
                }
            }
        }
    }
  }

  // post {
  //   always {
  //     echo 'Slack Notifications.'
  //     slackSend channel: '#jenkinscicd',
  //       color: COLOR_MAP[currentBuild.currentResult],
  //       message: """*${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} \n More info at: ${env.BUILD_URL}"""
  //   }
  // }
}
