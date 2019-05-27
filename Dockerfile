FROM 618548633277.dkr.ecr.eu-west-1.amazonaws.com/node-yarn-dumbinit
  
WORKDIR /usr/todo-ui

COPY . .

RUN yarn

CMD ["/usr/local/bin/yarn", "build-dev"]
