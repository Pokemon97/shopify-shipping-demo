import { json } from "@remix-run/node";

export async function getCarriersList(session, restApi) {
    const carriersList = await restApi.CarrierService.all({session});
    return carriersList.data;
}

export async function checkIfCarrierExistByName(session, resetApi, carrierName) {
    const carriersList = await getCarriersList(session, resetApi);
    let exist = false;
    carriersList.forEach(element => {
        if(element.name == carrierName) {
            exist = true;
            return;
        }
    });

    return exist;
}