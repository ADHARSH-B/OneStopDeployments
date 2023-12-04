
import { TransportProtocol,RegisterTaskDefinitionCommandInput, ApplicationProtocol, CreateClusterCommand } from "@aws-sdk/client-ecs";

// import { ApplicationProtocol, ECSClient, RegisterTaskDefinitionCommand, TransportProtocol } from "@aws-sdk/client-ecs";
const { ECSClient, RegisterTaskDefinitionCommand ,CreateServiceCommand} = require("@aws-sdk/client-ecs"); // CommonJS import
const client = new ECSClient();

const createCluster = async()=>{
    const input = {
    clusterName: "angular",
    capacityProviders:["FARGATE","FARGATE_SPOT"]
  };
 return await client.send( new CreateClusterCommand(input));
}

export async function createECS(){
    return createCluster().then(data=>{
        const input:RegisterTaskDefinitionCommandInput = {
            networkMode:"awsvpc",
          containerDefinitions: [
            {
              name: "hello-world",
              cpu: 10,
              essential: true,
              image: "public.ecr.aws/s5o7d0z2/angularapp:latest",
              memory: 10,
              portMappings: [
                {
                  containerPort: 80,
                  hostPort: 80,
                  protocol: TransportProtocol.TCP, // Set the protocol to either "tcp", "udp", or undefined
                  name: "test",
                  appProtocol:ApplicationProtocol.HTTP,
                  // Assuming this is the correct container port range
                },
              ],
            },
          ],
          "requiresCompatibilities":["FARGATE"],
          "cpu": "1024",
          "memory": "3072",
          family: "nodejssdk",
          taskRoleArn: "arn:aws:iam::590852515231:role/ecsTaskExecutionRole",
          volumes: [],
        };
          return client.send( new RegisterTaskDefinitionCommand(input));
        }).then(data=>{
            const input = {
                "cluster":"angular",
                "desiredCount": 1,
                "serviceName": "test",
                "taskDefinition": "nodejssdk",
                "launchType":"FARGATE",
                networkConfiguration: { // NetworkConfiguration
                    awsvpcConfiguration: { // AwsVpcConfiguration
                      subnets: [ // required
                        "subnet-0bb789e747fd41050",
                      ],
                      securityGroups: [
                        "sg-0727e0e90536e3e1a",
                      ],
                      assignPublicIp: "ENABLED" ,
                    },
                  }
              };
          return client.send(new CreateServiceCommand(input));
        
        })
        
}
