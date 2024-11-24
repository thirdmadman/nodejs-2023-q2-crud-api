// def String COLOR_MAP = [
//   'SUCCESS': 'good',
//   'FAILURE': 'danger',
// ]

pipeline {
  agent any

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
    CODE_REPO_BRANCH = 'master'
    REGISTRY_CREDENTIAL = 'ecr:eu-north-1:awscred'

    // registryCredential = 'ecr:us-east-1:awscred'
    // appRegistry = '805619463928.dkr.ecr.us-east-1.amazonaws.com/vprofileappimg'
    // vprofileRegistry = 'https://805619463928.dkr.ecr.us-east-1.amazonaws.com'
    // cluster = 'vprofile'
    // service = 'vprofileappsvc'
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

    // stage('SonarQube Analysis') {
    //   environment {
    //     scannerHome = tool 'sonar5.0'
    //   }
    //   steps {
    //     withSonarQubeEnv('sonar') {
    //       sh ''
    //       '${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=vprofile \
    //                -Dsonar.projectName=vprofile-repo \
    //                -Dsonar.projectVersion=1.0 \
    //                -Dsonar.sources=src/ \
    //                -Dsonar.java.binaries=target/test-classes/com/visualpathit/account/controllerTest/ \
    //                -Dsonar.junit.reportsPath=target/surefire-reports/ \
    //                -Dsonar.jacoco.reportsPath=target/jacoco.exec \
    //                -Dsonar.java.checkstyle.reportPaths=target/checkstyle-result.xml'
    //       ''
    //     }
    //   }
    // }

    // stage('Build App Image') {
    //   steps {
    //     script {
    //       dockerImage = docker.build(ECR_REGISTRY + ":$BUILD_NUMBER", './docker/node.dockerfile')
    //     }
    //   }
    // }

    // stage('Upload App Image') {
    //   steps {
    //     script {
    //       docker.withRegistry(ECR_REGISTRY_URI, REGISTRY_CREDENTIAL) {
    //         dockerImage.push("$BUILD_NUMBER")
    //         dockerImage.push('latest')
    //       }
    //     }
    //   }
    // }

    // stage('Deploy to ECS') {
    //   steps {
    //     withAWS(credentials: 'awscred', region: 'us-east-1') {
    //       sh """aws ecs update-service --cluster ${cluster} --service ${service} --force-new-deployment"""
    //     }
    //   }
    // }
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
