const Product = require('../models/product');
const Order = require('../models/order');
const OrderHasProducts = require('../models/order_has_products');
const storage = require('../utils/cloud_storage')

module.exports = {

    findByStatus(req, res) {
        const status = req.params.status;

        Order.findByStatus(status, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar las ordenes',
                    error: err
                });
            }

            //   for (const d of data) {
            //     d.address = JSON.parse(d.address);
            //     d.client = JSON.parse(d.client);
            //     d.products = JSON.parse(d.products);
            //     d.delivery = JSON.parse(d.delivery);
            // }
            
            
            return res.status(201).json(data);
        });
    },
    
    findByDeliveryAndStatus(req, res) {
        const id_delivery = req.params.id_delivery;
        const status = req.params.status;

        Order.findByDeliveryAndStatus(id_delivery, status, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar las ordenes',
                    error: err
                });
            }

     
            //     for (const d of data) {
            //     d.address = JSON.parse(d.address);
            //     d.client = JSON.parse(d.client);
            //     d.products = JSON.parse(d.products);
            //     d.delivery = JSON.parse(d.delivery);
            // }
            
            
            return res.status(201).json(data);
        });
    },
    
    findByClientAndStatus(req, res) {
        const id_client = req.params.id_client;
        const status = req.params.status;

        Order.findByClientAndStatus(id_client, status, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar las ordenes',
                    error: err
                });
            }
    // for (const d of data) {
    //             d.address = JSON.parse(d.address);
    //             d.client = JSON.parse(d.client);
    //             d.products = JSON.parse(d.products);
    //             d.delivery = JSON.parse(d.delivery);
    //         }
            
            
            return res.status(201).json(data);
        });
    },
   
   
    async create(req, res) {
        try {
            const order = JSON.parse(req.body.order);
            const files = req.files;

            if (files.length > 0) {
                const path = `Cyber_Link_Image_order_${Date.now()}`;
                const url = await storage(files[0], path);
                if (url != undefined && url != null) {
                    order.image = url;
                }
            }

            const orderId = await new Promise((resolve, reject) => {
                Order.create(order, (err, id) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(id);
                    }
                });
            });

            const productPromises = order.products.map((product) => {
                return new Promise((resolve, reject) => {
                    const productData = {
                        id: product.id,
                        stock: product.stock - product.quantity,
                    };

                    OrderHasProducts.create(orderId, product.id, product.quantity, async (err, idData) => {
                        if (err) {
                            reject(err);
                            return; // Salir de la funci��n para evitar ejecutar el c��digo siguiente en caso de error
                        }

                        console.log('LA CANTIDAD DE ESTOS ES =>', product.stock, ' - ', product.quantity);

                       
                            await Product.updateStock(productData, (err, result) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve();
                                }
                            });
                      

                    });
                });
            });

            await Promise.all(productPromises);

            return res.status(201).json({
                success: true,
                message: 'Orden registrada exitosamente',
                data: orderId
            });
        } catch (error) {
            return res.status(501).json({
                success: false,
                message: 'Existe un error con la orden o los productos en la orden',
                error: error.message
            });
        }
    },
    
    
    
    updateToPay(req, res) {
        const order = req.body;

        Order.updateToPay(order.id, order.id_delivery, (err, id_order) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Existe un error con al actualizar la order',
                    error: err
                });
            }
            return res.status(201).json({
                success: true,
                message: 'La order se actualizado de manera exitosa',
                data: `${id_order}`
            });
        })
    },

    
    updateToDispatched(req, res) {
        const order = req.body;

        Order.updateToDispatched(order.id, order.id_delivery, (err, id_order) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de actualizar la orden',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'La orden se ha actualizado correctamente',
                data: `${id_order}` // EL ID 
            });

        });
    },
    updateToOnTheWay(req, res) {
        const order = req.body;

        Order.updateToOnTheWay(order.id, order.id_delivery, (err, id_order) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de actualizar la orden',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'La orden se ha actualizado correctamente',
                data: `${id_order}` // EL ID 
            });

        });
    },
    updateToDelivered(req, res) {
        const order = req.body;

        Order.updateToDelivered(order.id, order.id_delivery, (err, id_order) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de actualizar la orden',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'La orden se ha actualizado correctamente',
                data: `${id_order}` // EL ID 
            });

        });
    },

}