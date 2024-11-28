# CI/CD Pipeline setup process

To run this pipeline you will need running Jenkins on k3s cluster.

It's supposed that you fork this repository so you can change Jenkins file and configure it for your needs.

## Deploy infrastructure

This task is not about deploying infrastructure, but about Jenkins automation, thats why here is a link to documentation on this process.

### Infrastructure deployment

To deploy infrastructure you need to follow steps in infrastructure repository

<https://github.com/thirdmadman/rsschool-devops-course-tasks/blob/master/task_6/>

You can find documentation on this process in

<https://github.com/thirdmadman/rsschool-devops-course-tasks/blob/master/task_6/README.md>

### ECR Creation

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

This parameters should be then copied to Jenkinsfile, and then saved.

### EC2 IAM Role for ECR

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

### Get password for Jenkins

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

After successful setup of Jenkins and login in, you can now create pipeline in its dashboard.

But before this we need setup of telegram bot:

### Creation of tg bot

In this particular pipeline notifications are setup for telegram bot.

You need to create telegram bot and obtain its token.

This steps described in official tg documentation:

<https://core.telegram.org/bots/tutorial>

After successful bot creation you need to obtain chat id of your bot and your account.

This steps described in may ways in google, but here is the link to one of the most popular ones:

<https://stackoverflow.com/questions/32423837/telegram-bot-how-to-get-a-group-chat-id>

Then you need to add your bot token and chat id to Jenkins credentials.

### Adding credentials for tg bot in Jenkins

You will need to create 2 credentials:

* ```TELEGRAM_BOT_TOKEN```
* ```TELEGRAM_CHAT_ID```

In Jenkins navigate to "Dashboard" > "Manage Jenkins" > "Credentials"

Then in "Stores scoped to Jenkins" select "System" > "Global credentials (unrestricted)"

Then for each of 2 credentials use "Add Credentials" button and fill in the fields.

For Kind choose "Secret text" for "ID" and "Description" use "TELEGRAM_BOT_TOKEN" and "TELEGRAM_CHAT_ID" respectively.

For Secret text choose  "Secret text" for  "Secret" and  "Value" use  "<your_bot_token>" and  "<your_chat_id>" respectively.

Now we can setup pipeline.

### Adding pipeline in Jenkins

Navigate to "Dashboard", click on "New Item"

In "Select an item type" select "Pipeline", give a name (in "Enter an item name") for your pipeline, for example: task-6

Then you need to configure SCM pulling, so Jenkins could get your last changes form repository and run pipeline on last commit.

Then configuration page will be opened, navigate to "Build Triggers" > "Poll SCM"

In "Schedule" input "H/5 * * * *" which means every it will pull from repository every 5 minutes.

In section "Pipeline" select in dropdown "Definition" option "Pipeline script from SCM"

Then in "SCM" dropdown select  "Git"

In "Repository URL" input url of your repository fork (or just this repository url)

In "Branch Specifier" input your branch, for example in case of this repo it will be "*/task6"

In "Script Path" input "Jenkinsfile"

In "Save" click "Save"

### Running pipeline in Jenkins manually and automatically to git commit

Now you can run pipeline manually or automatically to git commit.

Upon actions you will reive notifications from tg bot you created.

Once it time to build docker image and push it to ECR, you will be promoted in current run of pipeline in docker.

If you want to proceed, you have to click "Proceed" button.
