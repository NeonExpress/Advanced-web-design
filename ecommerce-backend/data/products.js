const products = [
    {
        name: "Arknights Saria Figurine",
        categories: "Chibi_Figurine",
        oldPrice: 2000,
        price: 1499,
        discount: 25,
        rating: 4,
        image:"../products/product1.webp"
    },
    {
        name: "Arknights Hoshiguma Figurine",
        categories: "Full_Figurine",
        oldPrice: 1000,
        price: 799,
        discount: 20,
        rating: 5,
        image:"../products/Product2.webp"
    },
    {
        name: "Arknights Kal'tsit Figurine",
        categories: "Chibi Figurine",
        oldPrice: 1000,
        price: 799,
        discount: 20,
        rating: 5,
        image:"../products/Product3.jpg"
    },
    {
        name: "Arknights clothing",
        categories: "Clothing",
        oldPrice: 1000,
        price: 799,
        discount: 20,
        rating: 5,
        image:"../products/Product4.webp"
    },
    {
        name: "Arknights Siege Figurine",
        category: "Chibi_Figurine",
        oldPrice: 1000,
        price: 799,
        discount: 20,
        rating: 5,
        image:"../products/Product5.webp"
    },
    {
        name: "Arknights Nian Figurine",
        categories: "Chibi_Figurine",
        oldPrice: 1000,
        price: 799,
        discount: 20,
        rating: 5,
        image:"../products/Product6.webp"
    },
    {
        name: "Arknights 3-in-1 Plushie",
        categories: "Plushie",
        oldPrice: 1000,
        price: 500,
        discount: 50,
        rating: 5,
        image:"../products/product7.webp"
    },
    {
        name: "Arknights Shu Figurine",
        categories: "Full Figurine",
        oldPrice: 1200,
        price: 999,
        discount: 20,
        rating: 5,
        image:"../products/Product8.webp"
    },    
];

// Export the products array so Express can return it in API responses
module.exports = products;
