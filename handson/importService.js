const { importApiRoot, projectKey } = require("./client.js");
const csvtojsonV2 = require("csvtojson");

module.exports.createImportSink = (importSinkDraftData) =>
 importApiRoot
 .withProjectKeyValue({projectKey})
 .importSinks()
 .post({body: createImportSinkDraft(importSinkDraftData)})
 .execute()

const createImportSinkDraft = (importSinkDraftData) => {
  const { key, resourceType } = importSinkDraftData;
  return {
    key,
    resourceType,
  };
};

module.exports.checkImportOperationStatus = (importSinkKey, id) => 
importApiRoot
.withProjectKeyValue({projectKey})
.productDrafts()
.importSinkKeyWithImportSinkKeyValue({importSinkKey})
.importOperations()
.withIdValue({id})
.get()
.execute();

module.exports.importProducts = async (importSinkKey) => 
importApiRoot.withProjectKeyValue({projectKey})
.productDrafts()
.importSinkKeyWithImportSinkKeyValue({importSinkKey})
.post({body: await getProductDraftsArray()}).execute()


const createImportProductsDraft = async () => {
  return {
    type: "product-draft",
    resources: await getProductDraftsArray(),
  };
};

const getProductDraftsArray = () => {
  // get data from csv
  // create product drafts array and send it back
  let productDraftsArray = [];
  let participantNamePrefix = "vk";
  return csvtojsonV2()
    .fromFile("./products.csv")
    .then((products) => {
      products.forEach((product) => {
        productDraftsArray.push({
          key: participantNamePrefix + "-" + product.productName,
          name: {
            "de": product.productName,
          },
          productType: {
            typeId: "product-type",
            key: product.productType,
          },
          slug: {
            "de": participantNamePrefix + "-" + product.productName,
          },
          description: {
            "de": product.description,
          },
          masterVariant: {
            sku: participantNamePrefix + "-" +product.inventoryId,
            key: participantNamePrefix + "-" +product.inventoryId,
            prices: [
              {
                value: {
                  type: "centPrecision",
                  currencyCode: product.currencyCode,
                  centAmount: parseInt(product.basePrice),
                },
              },
            ],
            images: [
              {
                url: product.imageUrl,
                dimensions: { w: 177, h: 237 },
              },
            ],
          },
        });
      });
      return productDraftsArray;
    });
};
