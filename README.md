#     Virtual Notebook Example

![](https://i.imgur.com/syerMxC.gif)

To use this app you need to have SQL Server 2018, entity framework 6 and npm installed on your device.

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