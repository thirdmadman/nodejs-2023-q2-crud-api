pipeline {
    agent any
    tools {
      nodejs('NodeJS 22.10.0')
    }
    options {
        skipStagesAfterUnstable()
    }
    stages {
        stage('Clone repository') {
            steps { 
                script{
                    checkout scm
                }
            }
        }
        stage('Exec simple tests') {
            steps { 
                script{
                    sh 'pwd; ls -la; npm i; npm run test:ci'
                }
            }
        }
        // stage('Build') { 
        //     steps { 
        //         script{
        //          app = docker.build("underwater")
        //         }
        //     }
        // }
        // stage('Test'){
        //     steps {
        //          echo 'Empty'
        //     }
        // }
        // stage('Deploy') {
        //     steps {
        //         script{
        //                 docker.withRegistry('https://720766170633.dkr.ecr.us-east-2.amazonaws.com', 'ecr:us-east-2:aws-credentials') {
        //               app.push("${env.BUILD_NUMBER}")
        //             app.push("latest")
        //             }
        //         }
        //     }
        // }
    }
}