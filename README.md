# MeetUp

This project is all about making it easier for users to organize meetings with other people. This application allows you to create groups, select meet up locations, and see other group members' current location, as well as their path from origin to the destination and estimated travel time.

## Getting Started

Please note that this is only the front-end part of the application. In order to run the app, you also need to follow the directions listed in [this repository](https://github.com/Kyrylo-Glamazdin/Group_Navigation_Capstone_Backend).
Alternatively, you can access the [hosted version](https://meet-up-web-app.herokuapp.com/) of this application. (If this link doesn't work, copy and paste the following link to your URL bar: https://meet-up-web-app.herokuapp.com/ ).

##

If you decide to download the app:
1. Make sure that you're in the needed directory and type
```
npm install
```
2. After the installation, start the app:
```
npm start
```
## Deployment

[Deployed App](https://meet-up-web-app.herokuapp.com/)

##

(If this link doesn't work, copy and paste the following link to your URL bar: https://meet-up-web-app.herokuapp.com/ )

## How to Use the App

After running the application, you must log into your account. If you don't have an account yet, you can create one.

#

After the registration, you will see a dashboard on the left part of your screen. Here, you can create a new group by clicking a "Create Group" button. Now you can give your group a name, add any users from the user list to your group, and to enter an address or a name of the place where you would like to meet. Please note that it must be a valid address or name of the place. After you're done, click the "Create Group!" button. 

#

Now you can see the list of your groups in the dashboard. In order to view the routes, click on the name of the group in the dashboard. If you are a member of multiple groups, you can switch between the groups by clicking on their names in the dashboard. To send an invitation to your group to the user that is not already in that group, you can click the "+" sign on the left from the name of the group. After you send an invittion, that user receives a notification in their dashboard and can either accept or decline the invitation. If they accept your invite, they would be added to the group. If you want to delete a group, you can click the "-" sign on the right from the name of the group in the dashboard.

#

When you click on the name of the group, you will see the map with all of the users and their paths and icons. When you hover over user's icon, you can see their name and the estimated time before their arrival to the destination. If you click on the user's icon, their path will be highlighted while all other users' paths would be hidden. Thus you can trace each user's path independently. If you want to see everyone's paths again, click on the "Clear Selection" button in the upper right corner of the screen. You can also open the chat by clicking the "Chat" button in the lower right corner. Once you send a message in the chat, all other users in your group will be able to see it.

#

When you're done, you can log out by clicking the "Log Out" button in the dashboard next to your user name.

## Built With

* [React](https://reactjs.org/) - The web framework used
* [MapBox](https://www.mapbox.com/) - Map design tools
* [Deck.gl](https://deck.gl/) - Framework for data analysis and visualization

## Authors

* **Kyrylo Glamazdin** - [GitHub](https://github.com/Kyrylo-Glamazdin)
* **Sami Hossain** - [GitHub](https://github.com/Arboghast)
* **Ken Chow** - [GitHub](https://github.com/zhouyanpu)
