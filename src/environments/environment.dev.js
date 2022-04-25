const environment = {
    name: "development",
    OpenIdConnect: {
        Authority: "https://localhost:44367",
        ClientId: "ClassifiedAds.Chrome",
    },
    ResourceServer: {
        Endpoint: "https://localhost:44312/api/",
        ChatHub: "https://localhost:44312/chatHub/",
        NotificationHub: "https://localhost:44312/notificationHub/",
        NotificationEndpoint: "https://localhost:44312/hubs/notification",
    },
    CurrentUrl: "http://localhost:3000/"
};
export default environment;
