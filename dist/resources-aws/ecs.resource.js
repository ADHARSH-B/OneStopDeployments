"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createECS = void 0;
const client_ecs_1 = require("@aws-sdk/client-ecs");
// import { ApplicationProtocol, ECSClient, RegisterTaskDefinitionCommand, TransportProtocol } from "@aws-sdk/client-ecs";
const { ECSClient, RegisterTaskDefinitionCommand, CreateServiceCommand } = require("@aws-sdk/client-ecs"); // CommonJS import
const client = new ECSClient();
const createCluster = () => __awaiter(void 0, void 0, void 0, function* () {
    const input = {
        clusterName: "angular",
        capacityProviders: ["FARGATE", "FARGATE_SPOT"]
    };
    return yield client.send(new client_ecs_1.CreateClusterCommand(input));
});
function createECS() {
    return __awaiter(this, void 0, void 0, function* () {
        return createCluster().then(data => {
            const input = {
                networkMode: "awsvpc",
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
                                protocol: client_ecs_1.TransportProtocol.TCP,
                                name: "test",
                                appProtocol: client_ecs_1.ApplicationProtocol.HTTP,
                                // Assuming this is the correct container port range
                            },
                        ],
                    },
                ],
                "requiresCompatibilities": ["FARGATE"],
                "cpu": "1024",
                "memory": "3072",
                family: "nodejssdk",
                taskRoleArn: "arn:aws:iam::590852515231:role/ecsTaskExecutionRole",
                volumes: [],
            };
            return client.send(new RegisterTaskDefinitionCommand(input));
        }).then(data => {
            const input = {
                "cluster": "angular",
                "desiredCount": 1,
                "serviceName": "test",
                "taskDefinition": "nodejssdk",
                "launchType": "FARGATE",
                networkConfiguration: {
                    awsvpcConfiguration: {
                        subnets: [
                            "subnet-0bb789e747fd41050",
                        ],
                        securityGroups: [
                            "sg-0727e0e90536e3e1a",
                        ],
                        assignPublicIp: "ENABLED",
                    },
                }
            };
            return client.send(new CreateServiceCommand(input));
        });
    });
}
exports.createECS = createECS;
