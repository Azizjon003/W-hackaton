// export const getShowProduct = (products: string[]) => {
//   const hasLocktheload = products.includes("locktheload");
//   const hasFacktoright = products.includes("factoright");
//   const hasSwiftrelay = products.includes("autobooker");

//   if (hasLocktheload && hasFacktoright) {
//     return "swiftrelay";
//   } else if (hasLocktheload) {
//     return "factoright";
//   } else if (hasFacktoright) {
//     return "locktheload";
//   } else {
//     return "flashrelay";
//   }
// };

// Misol uchun funksiya chaqirish:

// locktheload,=> factoright,
// Factoright, => locktheload
// sfiwtrelay, => locktheload
// flashrelay => locktheload
// relayok => locktheload
// locktheload, factoright => swiftrelay
// locktheload, swiftrelay => factoright
// factoright, swiftrelay => locktheload
// flashrelay, factoright => locktheload
// flashrelay, locktheload => factoright

// relay => locktheload, factoright, swiftrelay
// flash => flashrelay
