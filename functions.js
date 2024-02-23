import promptSync from "prompt-sync";
import mongoose from "mongoose";
import {
  CategoriesModel,
  SuppliersModel,
  ProductsModel,
  OffersModel,
  OrdersModel,
} from "./models.js";

const p = promptSync();

export async function addNewCategory() {
  console.log("Add new category");
  let name = p("Enter category name: ");
  let categoryDescription = p("Enter category description: ");

  let newCategory = {
    name,
    categoryDescription,
  };

  await CategoriesModel.create(newCategory);

  console.log("You have added a new category");
  console.log(newCategory);
}

// Function to add new product
export async function addNewProduct() {
  console.log("Add new product \n");

  try {
    const categories = await CategoriesModel.find();
    console.log("Current available categories:\n ");
    categories.forEach((category, index) => {
      console.log(`${index + 1}. ${category.name}`);
    });

    console.log(
      "\nChoose an option for adding the new product, by entering corresponding number:"
    );
    console.log("1. Add the new product into existing category.");
    console.log("2. Add a new category");
    let choice = p("Enter your choice: ");

    switch (choice) {
      case "1":
        try {
          console.log("\n==============");
          console.log(
            "\nYou have chosen to add product into an existing category."
          );

          let categoryChoice = parseInt(
            p(
              "Choose category by entering the number from the current categories above: "
            )
          );
          let selectedCategory = categories[categoryChoice - 1];

          let newCategory = selectedCategory.name;

          let newName = p("Enter name of new product: ");
          let newPrice = p("Enter the price: ");
          let newCost = p("Enter the cost: ");
          let newStock = p("Enter the stock: ");

          const currentSuppliers = await SuppliersModel.find();
          console.log("Current available suppliers:\n");
          currentSuppliers.forEach((supplier, index) => {
            console.log(`${index + 1}. ${supplier.name}`);
          });

          console.log(
            "\nChoose an option for adding the new product, by entering corresponding number:"
          );
          console.log("1. Add the new product from existing supplier.");
          console.log("2. Add a new supplier");
          let choiceSupplier = p("Enter your choice: ");

          switch (choiceSupplier) {
            case "1":
              console.log("\n==============");
              console.log(
                "You have chosen to add product from an existing supplier."
              );

              let supplierChoice = parseInt(
                p(
                  "Choose a supplier by entering the number from the current suppliers above: "
                )
              );
              let selectedSupplier = currentSuppliers[supplierChoice - 1];

              let newSupplier = {
                name: selectedSupplier.name,
                contact: selectedSupplier.contact,
              };

              let newProduct = {
                name: newName,
                category: newCategory,
                price: newPrice,
                cost: newCost,
                stock: newStock,
                supplier: newSupplier,
              };

              await ProductsModel.create(newProduct);
              console.log("You have added a new product");
              console.log(newProduct);
              break;
            case "2":
              try {
                console.log("\nYou have chosen to add a new supplier");
                const name = p("Enter name of new supplier: ");
                const contactName = p("Enter new contact name: ");
                const contactEmail = p("Enter new supplier email: ");

                const newSupplier = new SuppliersModel({
                  name: name,
                  contact: {
                    name: contactName,
                    email: contactEmail,
                  },
                });

                await newSupplier.save();
                console.log(` \n Supplier "${name}" was added!`);

                let newProduct = {
                  name: newName,
                  category: newCategory,
                  price: newPrice,
                  cost: newCost,
                  stock: newStock,
                  supplier: newSupplier,
                };

                await ProductsModel.create(newProduct);
                console.log("You have added a new product");
                console.log(newProduct);
              } catch (error) {
                console.log("\n An error occured! " + error);
              }
              break;
          }
        } catch (error) {
          console.log("An Error occured: " + error);
        }
        break;
      case "2":
        console.log("You have chosen to add a new category.");
        let newCategoryName = p("Enter category name: "); // Changed variable name for clarity
        let newCategoryDescription = p("Enter category description: ");

        let newCategory = {
          name: newCategoryName, // Adjusted to match schema
          categoryDescription: newCategoryDescription,
        };

        await CategoriesModel.create(newCategory);

        console.log("You have added a new category");
        console.log(newCategory);

        let newName = p("Enter name of new product: ");
        let newPrice = p("Enter the price: ");
        let newCost = p("Enter the cost: ");
        let newStock = p("Enter the stock: ");

        const currentSuppliers = await SuppliersModel.find();
        console.log("Current available suppliers:\n");
        currentSuppliers.forEach((supplier, index) => {
          console.log(`${index + 1}. ${supplier.name}`);
        });

        console.log(
          "\nChoose an option for adding the new product, by entering corresponding number:"
        );
        console.log("1. Add the new product from existing supplier.");
        console.log("2. Add a new supplier");
        let choiceSupplier = p("Enter your choice: ");

        switch (choiceSupplier) {
          case "1":
            console.log("\n==============");
            console.log(
              "You have chosen to add product from an existing supplier."
            );

            let choice = parseInt(
              p(
                "Choose a supplier by entering the number from the current suppliers above: "
              )
            );
            let selectedSupplier = currentSuppliers[choice - 1];

            let newSupplier = {
              name: selectedSupplier.name,
              contact: selectedSupplier.contact,
            };

            let newProduct = {
              name: newName,
              category: newCategoryName,
              price: newPrice,
              cost: newCost,
              stock: newStock,
              supplier: newSupplier,
            };

            await ProductsModel.create(newProduct);
            console.log("You have added a new product");
            console.log(newProduct);
            break;
          case "2":
            try {
              console.log("\nYou have chosen to add a new supplier");
              const name = p("Enter name of new supplier: ");
              const contactName = p("Enter new contact name: ");
              const contactEmail = p("Enter new supplier email: ");

              const newSupplier = new SuppliersModel({
                name: name,
                contact: {
                  name: contactName,
                  email: contactEmail,
                },
              });

              await newSupplier.save();
              console.log(` \n Supplier "${name}" was added!`);

              let newProduct = {
                name: newName,
                category: newCategoryName,
                price: newPrice,
                cost: newCost,
                stock: newStock,
                supplier: {
                  name: newSupplier.name,
                  contact: newSupplier.contact,
                },
              };

              await ProductsModel.create(newProduct);
              console.log("You have added a new product");
              console.log(newProduct);
            } catch (error) {
              console.log("\n An error occured! " + error);
            }
            break;
        }
        break;
    }
  } catch (error) {
    console.log("An Error occured: " + error);
  }
}

// Function to view products by category
export async function viewProductsByCategory() {
  console.log("You have chosen to view products based on Category.");

  try {
    const categories = await CategoriesModel.find();
    console.log(
      "You can choose to view products out of following categories:\n "
    );
    categories.forEach((category, index) => {
      console.log(`${index + 1}. ${category.name}`);
    });
    console.log("\n");
    const choice = parseInt(p("Choose category by entering the number: "));
    const selectedCategory = categories[choice - 1];

    const products = await ProductsModel.find({
      category: selectedCategory.name,
    });
    console.log(`\nProducts in category "${selectedCategory.name}":\n`);
    products.forEach((product, index) => {
      console.log(
        `${index + 1}. ${product.name} - Price: $${product.price}, Stock: ${
          product.stock
        }`
      );
    });
  } catch (error) {
    console.error("Error viewing products by category:", error);
  }
}

// Function to view products by supplier
export async function viewProductsBySupplier() {
  console.log("You have chosen to view products based on supplier.");

  try {
    const supplier = await SuppliersModel.find();
    console.log(
      "You can choose to view products from the following suppliers:\n "
    );
    supplier.forEach((supplier, index) => {
      console.log(`${index + 1}. ${supplier}`);
    });
    console.log("\n");
    const choice = parseInt(p("Choose supplier by entering a number: "));
    const selectedSupplier = supplier[choice - 1];

    const products = await ProductsModel.find({
      supplier: selectedSupplier.name,
    });
    console.log(`\nProducts of Supplier "${selectedSupplier.name}":\n`);
    products.forEach((product, index) => {
      console.log(
        `${index + 1}. ${product.name} - Price: $${product.price}, Stock: ${
          product.stock
        }`
      );
    });
  } catch (error) {
    console.error("Error viewing products by supplier:", error);
  }
}

// Function to view all orders in a specific price range
export async function viewAllOffersInPriceRange(lowerLimit, upperLimit) {
  console.log("View all orders within a price range");

  const orders = await OffersModel.find({
    price: {
      $gte: lowerLimit,
      $lte: upperLimit,
    },
  });
  console.log(
    `orders within the price range of ${lowerLimit} and ${upperLimit}`
  );
  orders.forEach((offer) => {
    console.log(
      ` \nProducts: ${offer.products.join(", ")},  
        \nPrice: ${offer.price}, \nActive: ${offer.active} \n`
    );
  });
}

// Function to view offers from category
export async function offersFromCategory() {
  console.log("You have chosen to view offers based on Category.");

  try {
    const categories = await CategoriesModel.find();
    console.log(
      "You can choose to view offers out of following categories:\n "
    );
    categories.forEach((category, index) => {
      console.log(`${index + 1}. ${category.name}`);
    });
    console.log("\n");
    const choice = parseInt(p("Choose category by entering the number: "));
    const selectedCategory = categories[choice - 1];

    // Retrieve all products within the selected category
    const productsInCategory = await ProductsModel.find({
      category: selectedCategory.name,
    });

    // Extract the names of these products
    const productNames = productsInCategory.map((product) => product.name);

    // Find all offers that contain any of these products
    const offers = await OffersModel.find({
      products: { $in: productNames }, // This line checks if any of the products in an offer belong to the selected category
    });

    console.log(
      `\nOffers containing product(s) in the "${selectedCategory.name}" category:\n`
    );
    offers.forEach((offer, index) => {
      console.log(
        `${index + 1}. Products: ${offer.products.join(", ")} \n - Price: $${
          offer.price
        }, Active: ${offer.active ? "Yes" : "No"} \n`
      );
    });
  } catch (error) {
    console.error("Error viewing offers by category:", error);
  }
}

// export async function offersFromCategory() {
//   console.log("You have chosen to view offers based on Category.");

//   try {
//     const categories = await CategoriesModel.find();
//     console.log(
//       "You can choose to view products out of following categories:\n "
//     );
//     categories.forEach((category, index) => {
//       console.log(`${index + 1}. ${category.name}`);
//     });
//     console.log("\n");
//     const choice = parseInt(p("Choose category by entering the number: "));
//     const selectedCategory = categories[choice - 1];

//     const offers = await OffersModel.find({
//       category: selectedCategory.name,
//     });
//     console.log(`\nProducts in category "${selectedCategory.name}":\n`);
//     offers.forEach((offer, index) => {
//       console.log(
//         `${index + 1}. ${offer.products} - Price: $${offer.price}, Active: ${
//           offer.active
//         }`
//       );
//     });
//   } catch (error) {
//     console.error("Error viewing offers by category:", error);
//   }
// }

export async function viewordersBasedOnStock() {
  // Function to view the number of orders based on the number of its products in stock
}

export async function createOrderForProducts() {
  console.log("Create order for products");
  const productName = p("Enter the product name: ");
  const quantity = parseInt(p("Enter the quantity: "), 10);
  const additionalDetail = p("Enter additional detail: ");

  try {
    // Find the product by name with sufficient stock
    let productToOrder = await ProductsModel.findOne({
      name: { $regex: new RegExp(productName, "i") },
      stock: { $gte: quantity },
    });

    if (!productToOrder || productToOrder.stock < quantity) {
      console.log(
        `${productName} is out of stock or does not have enough stock!`
      );
      return;
    }

    // Create a new SalesOrder document
    const newProductOrder = new OrdersModel({
      product: productToOrder.toObject(), // Assuming you're embedding the whole product
      quantity: quantity,
      status: "pending", // Providing a value for the required 'status' field
      additional_detail: additionalDetail,
      total_price: productToOrder.price * quantity, // Example calculation for total price
      total_cost: productToOrder.cost * quantity, // Example calculation for total cost
    });

    // Save the new SalesOrder document to the database
    await newProductOrder.save();

    // Reduce the stock of the ordered product
    await ProductsModel.updateOne(
      { _id: productToOrder._id },
      { $inc: { stock: -quantity } }
    );

    console.log(`Order for ${productName} created successfully!`);
  } catch (error) {
    console.error("Error creating order for products:", error);
  }
  // let product = await OrdersModel.findOne({
  //   name: { $regex: new RegExp(productName, "i") },
  // });
  // console.log(
  //   `Product: ${productName},
  //    Quantity: ${quantity},
  //    Additional Detail: ${additionalDetail}`
  // );
  // Function to create order for individual products
}

// // Function to create order for offers
export async function createOrderForOffers() {
  try {
    // Fetch all active offers
    const activeOffers = await OffersModel.find({ active: true }).select(
      "offer products offerProducts price -_id"
    );
    console.log("Available Offers:");
    activeOffers.forEach((offer, index) => {
      console.log(
        `${index + 1}. ${offer.offer}:\n   Products: ${offer.products.join(
          ", "
        )},\n   Price: $${offer.price} \n`
      );
    });

    // User selects an offer
    const offerIndex =
      parseInt(
        p("Enter the index(!) of the offer you want to place an order for: ")
      ) - 1;
    if (offerIndex < 0 || offerIndex >= activeOffers.length) {
      console.log("Invalid selection.");
      return;
    }
    const selectedOffer = activeOffers[offerIndex];

    //console.log(selectedOffer);

    // User specifies the quantity
    const quantity = parseInt(
      p("Enter the quantity of the offer you want to order: ")
    );
    if (isNaN(quantity) || quantity <= 0) {
      console.log("Invalid quantity.");
      return;
    }

    // Calculate total price based on selected offer and quantity
    const totalPrice = selectedOffer.price * quantity;

    // Create a new order
    const newOrder = new OrdersModel({
      offer: {
        offer: selectedOffer.offer,
        products: selectedOffer.products,
        price: selectedOffer.price,
        active: selectedOffer.active,
        category: selectedOffer.category,
      },
      quantity: quantity,
      status: "pending", // Assuming 'pending' is a valid status
      total_price: totalPrice,
    });

    await newOrder.save();
    console.log("\nOrder placed successfully.");
    console.log(
      `\nNew order placed: \n  ${selectedOffer.offer} \n   Quantity: ${newOrder.quantity} \n   Total price of order: $${newOrder.total_price}`
    );
  } catch (error) {
    console.error("Error creating order for offers:", error);
  }
}

// Function to ship orders
export async function shipOrders() {
  const response = p(
    "Has the product been shipped? (Type 'yes' for Yes, any other answer for No): "
  );

  if (response.toLowerCase() === "ja") {
    console.log("The product has been shipped.");
  } else {
    console.log("The product has not been shipped.");
  }
}

// Function to add new supplier
export async function addNewSupplier() {
  try {
    console.log("Add new supplier");
    const name = p("Enter name of new supplier: ");
    const contactName = p("Enter new contact name: ");
    const contactEmail = p("Enter new supplier email: ");

    const newSupplier = new SuppliersModel({
      name: name,
      contact: {
        name: contactName,
        email: contactEmail,
      },
    });

    await newSupplier.save();
    console.log(` \n Supplier "${name}" was added!`);
  } catch (error) {
    console.error("Error adding new supplier:", error);
  }
}

export async function viewAllSuppliers() {
  // Function to view all suppliers
  console.log("View all suppliers");
  const suppliers = await SuppliersModel.find();
  console.log("All suppliers: \n");
  suppliers.forEach((supplier) => {
    console.log(
      `Name: ${supplier.name}, \nContact: ${supplier.contact.name}, \nEmail: ${supplier.contact.email} \n`
    );
  });
}
// Function to view all sales
export async function viewAllSales() {
  try {
    const salesOrders = await OrdersModel.find();

    if (salesOrders.length === 0) {
      console.log("There are no sales orders to display.");
      return;
    }

    salesOrders.forEach((order, index) => {
      console.log(
        `Order Number: ${order.orderNumber}, Date: ${
          order.date || "N/A"
        }, Status: ${order.status || "N/A"}, Total Cost: ${
          order.totalCost || "N/A"
        }`
      );
    });
  } catch (error) {
    console.error("An error occurred while fetching sales orders:", error);
  }
}

export async function viewSumOfProfits() {
  console.log("View sum of all profits");
  console.log("Type 1 to view the sum of all profits");

  let choice = p("Make a choice by entering a number: ");
  let taxRate = 0.2;

  switch (choice) {
    case "1":
      console.clear();
      console.log("Sum of all profits");

      try {
        // Fetch all offers from the database
        let allOffers = await OffersModel.find({ active: true });

        // Calculate total profit for all products in all offers
        let totalProfit = 0;
        allOffers.forEach((offer) => {
          offer.offerProducts.forEach((product) => {
            let profit = product.price - product.cost;
            console.log(`Profit for ${product.name}: ${profit}`);
            totalProfit += profit;
          });
        });

        // Apply tax rate
        totalProfit = totalProfit * (1 - taxRate);

        console.log(`Total Profit: ${totalProfit}`);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }

      break;

    case "2":
      console.clear();
      let productName = p("Enter the name of the product: ");
      let specificOffers = await OffersModel.find({
        "offerProducts.name": productName,
        active: true,
      });
      let specificProfit = 0;
      specificOffers.forEach((offer) => {
        offer.offerProducts.forEach((product) => {
          if (product.name === productName) {
            let profit = (product.price - product.cost) * product.quantity;
            console.log(`Profit: ${profit}`);
            specificProfit += profit;
          }
        });
      });
      specificProfit = specificProfit * (1 - taxRate); // Exclude tax
      console.log(`Total Profit for ${productName}: ${specificProfit}`);
      break;

    default:
      console.log("Invalid choice. Please enter 1 or 2.");
      break;
  }
}
