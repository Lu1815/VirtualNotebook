#     Virtual Notebook Example

![](https://i.imgur.com/syerMxC.gif)

**_NOTE:_** This app is optimized to better used in a phone screen.

**_NOTE:_** To run this app for the first time you need to run the command below to create the database used in the app.

```
    dotner ef database update
```

To use this app you need to have SQL Server 2018, entity framework 6 and npm installed on your device.

**_NOTE:_** This app use .NET 6, so, if you have a different version of .NET in use (for example .NET 7) you'll need to run the command below and once the file global.json is created, you'll need to type the version of .NET used in the app. For example when creating this README I had dotnet 7.0.100 and 6.0.403 in my device, to run this project when updating my dotnet version I needed to create a global.json and write the 6.0.403 version of dotnet in my global.json file.

```
    dotnet new globaljson
```

To run this app (once every requirement is installed), you need to execute the commands bellow:

### To run the backend (you should run the backend first):

```
    dotnet run
```
### To run the fronted:

```
    npm run start
```

## BACKEND DEPENDENCIES

To install entity framework 6, globally on your device, run the command bellow on the windows CMD:

```
    dotnet tool install --global dotnet-ef
```

To create the database run the command bellow inside the **Noteebook/Notebook** folder:

```
    dotnet ef database update
```

## FRONTEND DEPENDENCIES

To install npm dependencies in the react frontend folder run:

```
    npm install
```

However if there are some problems installing a package with npm install, you can install them manually. For that here is the dependencies list I used to built this small app:

Package Name | Version
------------ | --------
@chakra-ui/react| ^2.3.1,
@chakra-ui/icons| ^2.0.9
autoprefixer| ^10.4.8,
postcss| ^8.4.16,
tailwindcss| ^3.1.8
@emotion/react| ^11.10.4,
@emotion/styled| ^11.10.4,
@reduxjs/toolkit| ^1.8.5,
@testing-library/jest-dom| ^5.16.5,
@testing-library/react| ^13.3.0,
@testing-library/user-event| ^13.5.0,
axios| ^0.27.2,
framer-motion| ^7.2.1,
react| ^18.2.0,
react-dom| ^18.2.0,
react-loader-spinner| ^5.3.3,
react-redux| ^8.0.2,
react-router-dom| ^6.3.0,
react-scripts| 5.0.1,
web-vitals| ^2.1.4

The command to install them is:

```
    npm i packageName
```

By default npm is going to install the latest version of each package if there is no version specified