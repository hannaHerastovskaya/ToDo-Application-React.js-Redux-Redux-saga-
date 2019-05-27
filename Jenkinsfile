pipeline {
    agent any
    environment {
        ECR_ADDRESS    = '618548633277.dkr.ecr.eu-west-1.amazonaws.com/'
        IMAGE_NAME     = 'todolist-ui'
        ECR_CREDS      = 'ecr:eu-west-1:aws_ecr_creds'
        image          = ''
    }
    stages {
        stage('Build') {
            steps {
                script {
                    env.NUM_BUILD_UI = env.BUILD_NUMBER
                    sh 'sed -i "s|localhost:8080|todo-list-frontdev.k8s.ws.local:80|" src/api/dashboard.js src/api/userController.js src/WebSocketContainer.jsx'
                    docker.withRegistry('https://' + ECR_ADDRESS, ECR_CREDS) {
                        image = docker.build(ECR_ADDRESS + IMAGE_NAME)
                    }
                }
            }
        }
        stage('Push') {
            steps {
                script {
                    docker.withRegistry('https://' + ECR_ADDRESS + IMAGE_NAME, ECR_CREDS) {
                        image.push("${BUILD_NUMBER}")
                        image.push("latest")
                    }
                    sh 'docker rmi ' + image.id + ':${BUILD_NUMBER} ' + image.id + ':latest'
                }
            }
        }
    }
}
