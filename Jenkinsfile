// def String COLOR_MAP = [
//   'SUCCESS': 'good',
//   'FAILURE': 'danger',
// ]

pipeline {
  agent {
    kubernetes {
     yaml """
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
"""
    }
  }

  tools {
    nodejs('NodeJS 22.10.0')
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
      }
    }

    stage('Run Unit Tests') {
      steps {
        script {
          sh 'npm i; npm run test:ci'
        }
      }
    }

    stage('Run App Bulild') {
      steps {
        script {
          sh 'npm i; npm run prod:build'
        }
      }
    }

    stage('Build DockerImage with Kaniko and Push to ECR') {
      environment {
        PATH = "/busybox:/kaniko:$PATH"
      }
      steps {
        container(name: 'kaniko', shell: '/busybox/sh') {
          sh """#!/busybox/sh
          pwd;
          echo ${ECR_REGISTRY}:${BUILD_NUMBER};
          ls -li;
          /kaniko/executor --context `pwd`/.docker/ --dockerfile `pwd`/.docker/node.dockerfile --destination ${ECR_REGISTRY}:latest"""
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