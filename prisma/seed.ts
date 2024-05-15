const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient();

const description =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec nisl lorem. Praesent pharetra, sapien ut fringilla malesuada, nisi felis ullamcorper ex, eu consectetur elit dolor sed dolor. Praesent orci mi, auctor aliquet semper vitae, volutpat quis augue. Cras porta sapien nec pharetra laoreet. Sed at velit sit amet mauris varius volutpat sit amet id mauris. Maecenas vitae mattis ante. Morbi nulla quam, sagittis at orci eu, scelerisque auctor neque.";

const createBurguers = async (restaurantId: string) => {
  const burguersCategory = await prismaClient.category.create({
    data: {
      name: "Hambúrgueres",
      imageUrl:
        "https://utfs.io/f/92918634-fc03-4425-bc1f-d1fbc8933586-vzk6us.png",
    },
  });

  const burguerProducts = [
    {
      name: "Cheese Burguer",
      price: 30,
      description: description,
      discountPercentage: 10,
      imageUrl:
        "https://utfs.io/f/ae177fa1-129c-4f43-9928-aa8ac1080a18-yqapzx.png",
      categoryId: burguersCategory.id,
      restaurantId: restaurantId,
    },
    {
      name: "Double Cheese Burguer",
      price: 40,
      description: description,
      discountPercentage: 7,
      imageUrl:
        "https://utfs.io/f/dca007fe-0025-422e-9328-16d40f0a1792-yqapzy.png",
      categoryId: burguersCategory.id,
      restaurantId: restaurantId,
    },
    {
      name: "Bacon Burguer",
      price: 35,
      description: description,
      discountPercentage: 5,
      imageUrl:
        "https://utfs.io/f/4cb1ca21-0748-4296-a23d-88e52687506a-yqapzz.png",
      categoryId: burguersCategory.id,
      restaurantId: restaurantId,
    },
    {
      name: "Double Bacon Burguer",
      price: 45,
      description: description,
      discountPercentage: 10,
      imageUrl:
        "https://utfs.io/f/ed9fde1e-0675-4829-8001-a775e2825dc6-yqaq00.png",
      categoryId: burguersCategory.id,
      restaurantId: restaurantId,
    },
    {
      name: "Chicken Burguer",
      price: 30,
      description: description,
      discountPercentage: 7,
      imageUrl:
        "https://utfs.io/f/0aff860a-3e05-42fd-9b2a-53d03c744949-yqaq01.png",
      categoryId: burguersCategory.id,
      restaurantId: restaurantId,
    },
    {
      name: "Double Chicken Burguer",
      price: 40,
      description: description,
      discountPercentage: 5,
      imageUrl:
        "https://utfs.io/f/d2157790-fcb7-4d09-b074-80af4bfb9892-yqaq02.png",
      categoryId: burguersCategory.id,
      restaurantId: restaurantId,
    },
  ];

  for (const product of burguerProducts) {
    await prismaClient.product.create({
      data: product,
    });

    console.log(`Created ${product.name}`);
  }

  console.log("Created Burguers");
};

const createPizzas = async (restaurantId: string) => {
  const pizzasCategory = await prismaClient.category.create({
    data: {
      name: "Pizzas",
      imageUrl:
        "https://utfs.io/f/d9ca0163-6bc8-42dc-bbb3-377636849cd8-mtj7yz.png",
    },
  });

  const pizzaProducts = [
    {
      name: "Pepperoni Pizza",
      price: 45,
      description: description,
      discountPercentage: 0,
      imageUrl:
        "https://utfs.io/f/645ba997-00b1-44ed-9928-b9eb41e93896-berpub.jpg",
      categoryId: pizzasCategory.id,
      restaurantId: restaurantId,
    },
    {
      name: "Margarita Pizza",
      price: 40,
      description: description,
      discountPercentage: 5,
      imageUrl:
        "https://utfs.io/f/4ee1f69b-e0a3-4166-bae5-b666996bcd3b-berpua.png",
      categoryId: pizzasCategory.id,
      restaurantId: restaurantId,
    },
    {
      name: "Hawaiian Pizza",
      price: 45,
      description: "A delicious hawaiian pizza",
      discountPercentage: 5,
      imageUrl:
        "https://utfs.io/f/0bb7a869-f369-4506-94ea-6cc23c8dd92f-berpu9.png",
      categoryId: pizzasCategory.id,
      restaurantId: restaurantId,
    },
    {
      name: "Vegetarian Pizza",
      price: 35,
      description: description,
      discountPercentage: 0,
      imageUrl:
        "https://utfs.io/f/1bb04a24-361c-4e3a-ad2f-81255f2d53b9-berpux.png",
      categoryId: pizzasCategory.id,
      restaurantId: restaurantId,
    },
    {
      name: "Meat Lovers Pizza",
      price: 50,
      description: description,
      discountPercentage: 10,
      imageUrl:
        "https://utfs.io/f/ead919ee-2e3d-423f-b294-e525f9d6a5b7-berpuy.png",
      categoryId: pizzasCategory.id,
      restaurantId: restaurantId,
    },
  ];

  for (const product of pizzaProducts) {
    await prismaClient.product.create({
      data: product,
    });

    console.log(`Created ${product.name}`);
  }

  console.log("Created pizzas");
};

const main = async () => {
  const restaurant = await prismaClient.restaurant.create({
    data: {
      name: "Nine foods",
      imageUrl: "https://i.imgur.com/D8pcUkN.png",
      deliveryFee: 0,
      deliveryTimeMinutes: 45,
    },
  });

  await createBurguers(restaurant.id);
  await createPizzas(restaurant.id);
};

main()
  .then(() => {
    console.log("Seed do banco de dados realizado com sucesso!");
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
