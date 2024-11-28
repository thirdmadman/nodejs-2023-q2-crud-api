# CI/CD Pipeline setup process

## Deploy infrastructure

### Infrastructure retirements

#### Infrastructure deployment

#### ECR Creation

For storing application docker images you need to create ECR repository in same AWS account an your infrastructure.

This ECR will store builded docker images.

After creation of ECR you will need data form "link" parameter of your repository.

For example:

```940482417673.dkr.ecr.eu-north-1.amazonaws.com/thirdmadman/task-6```

This link actually contains 3 parameters:

```AWS_ACCOUNT_ID```, ```AWS_DEFAULT_REGION```, ```IMAGE_REPO_NAME```

For example form previous link we can extract:

```md
AWS_ACCOUNT_ID = '940482417673'
AWS_DEFAULT_REGION = 'eu-north-1'
IMAGE_REPO_NAME = 'thirdmadman/task-6'
```

This parameters should be then copied to Jenkinsfile

#### EC2 IAM Role for ECR

To make communication of Jenkins to ECR we need to create IAM role for Jenkins, especially for EC2 instance on which Jenkins will be running.

In this particular case we will use only one EC2 instance for k3s cluster, so this role should be then assigned to EC2 instance with name ```k3s-main-ec2-instance```

Create IAM role for Jenkins with name ec2-ecr-role, and add following polices:

* AmazonElasticContainerRegistryPublicFullAccess
* AmazonElasticContainerRegistryPublicPowerUser
* AmazonElasticContainerRegistryPublicReadOnly
* EC2InstanceProfileForImageBuilderECRContainerBuilds

To assign role to EC2 instance:

* Navigate into EC2 Dashboard
* select your EC2 instance with name ```k3s-main-ec2-instance```
* Choose Actions, Security, Modify IAM role.
* For IAM role, select the ```ec2-ecr-role```
* Choose Update IAM role.

#### Get password for Jenkins

Using output of the terraform infrastructure setup, get command for connections to you k3s cluster via jumphost.
More information on this, you can find in readme file for terraform infrastructure setup.

After connection to k3s cluster, get output of cloudinit by this command:
```tail -f /var/log/cloud-init-output.log```

You should see in bottom of output of this command something like

```Cloud-init v. 22.2.2 finished at Wed, 27 Nov 2024 18:33:04 +0000. Datasource DataSourceEc2.  Up 43.44 seconds```

This will mean that setup of Jenkins is done.
Above of this lines will be Jenkins password, copy it and navigate in browser to Jenkins page via public IP of your bastion/nat gateway instance.

Login to Jenkins.

## CI/CD Pipeline setup in Jenkins

### Creation of tg bot

### Adding credentials for tg bot in Jenkins

### Adding pipeline in Jenkins

### Running pipeline in Jenkins manually and automatically to git commit

