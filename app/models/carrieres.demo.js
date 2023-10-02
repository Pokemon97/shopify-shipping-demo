import axios from 'axios';
import { json } from "@remix-run/node";


const request_url = 'https://' + process.env.SHOP + '.myshopify.com/admin/api/' + process.env.API_VERSION + '/carrier_services.json';

export async function getListCarrieres() {    
    let listCarriers = await axios.get(
        request_url,
        {
            headers: {
                "X-Shopify-Access-Token": process.env.ACCESS_TOKEN
            }
        }
    ).then(function (response) {
            return response.data;
        }
    ).catch(function (error) {
            return json({carrier_services: []});
        }
    );
    
    return listCarriers;
}

export async function checkExistByName(carrierName) {
    let exist = await axios.get(
        request_url,
        {
            headers: {
                "X-Shopify-Access-Token": process.env.ACCESS_TOKEN
            }
        }
    ).then(function (response) {
            let a = false;
            response.data.carrier_services.forEach(element => {
                if (element.name == carrierName) {
                    a = true;
                    return;
                }
            });
            return a;
        }
    ).catch(function (error) {
            return false;
        }
    );
    
    return exist;
}