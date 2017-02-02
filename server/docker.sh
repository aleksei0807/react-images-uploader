#!/bin/sh
sudo docker build -t node-images-server .
sudo docker run -p 9090:9090 -d -it --rm --name node-images-server node-images-server
