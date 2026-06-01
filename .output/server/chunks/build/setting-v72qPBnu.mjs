const SOCIAL_ICONS = {
  1: "pi pi-google",
  2: "pi pi-facebook",
  3: "pi pi-youtube",
  4: "pi pi-linkedin",
  5: "pi pi-twitter",
  6: "pi pi-telegram",
  7: "pi pi-instagram"
};
const getSocialIcon = (stype) => {
  return SOCIAL_ICONS[stype] || "pi pi-globe";
};

export { getSocialIcon as g };
//# sourceMappingURL=setting-v72qPBnu.mjs.map
