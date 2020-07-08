var IS_ADMIN_SESSION 
var PATH_PREFIX = "./";
function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};