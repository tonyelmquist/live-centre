#!/bin/bash

echo "##########################################"
echo "######## Media Centre - Build App ########"
echo "##########################################"

echo "> Do you want to update the repo? (y/n)"
read option

update_repo() {
	
	echo "> Updating repo..."
	git fetch --prune
	git checkout master
	git pull
	
}

buildDeployWWW() {

	echo "> Building WWW..."
	npm install
	npm install --only=dev
	npm run build
	npm run deploy

}

if [ $option = "y" ] || [ $option = "Y" ]; then
    update_repo
	buildDeployWWW
else
    buildDeployWWW
fi

xcodebuild -workspace "../ios/Live Centre.xcworkspace" -scheme "development"
