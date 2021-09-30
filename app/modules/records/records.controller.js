const recordsModel = require('./records.model');
const joiImport = require("joi");
const joiDate = require('@joi/date');
const Joi = joiImport.extend(joiDate);


class recordsController{
    constructor() {

        this.count = async (req, res) => {

            let response = {};

            try {

                const schema = Joi.object().keys({
                    startDate: Joi.date().format('YYYY-MM-DD').required(),
                    endDate: Joi.date().format('YYYY-MM-DD').required(),
                    minCount: Joi.number().integer().max(10000).min(0).required(),
                    maxCount: Joi.number().integer().max(10000).min(0).required()
                });

                let request = req.body;
                let resultValidation = schema.validate(request);

                if (resultValidation.error) {

                    response = {
                        code: 7,
                        msg: "Error",
                        error: 'Field ' + resultValidation.error.details[0].message,
                    };

                    return res.status(400).json(response);
                }

                console.log(new Date(request.startDate + ' 00:00:00'), new Date(request.endDate + ' 23:59:59'));

                let records = await recordsModel.aggregate([
                    {
                        $match: {
                            createdAt: {
                                $gte: new Date(request.startDate + ' 00:00:00'),
                                $lte: new Date(request.endDate + ' 23:59:59')
                            }
                        }

                    },
                    {
                        $project: {
                            key: 1,
                            createdAt: 1,
                            totalCount: {
                                "$sum": "$counts"
                            }
                        }
                    },
                    {
                        $match: {
                            totalCount: {
                                $gte: request.minCount,
                                $lte: request.maxCount
                            }
                        }
                    }
                ]);


                response = {
                    code: 0,
                    msg: "Success",
                    records
                };

                return res.status(200).json(response);
            } catch (e) {

                response = {
                    code: 9,
                    msg: "Error",
                    error: e.message || e.response.data['errors'][0].message || 'Something went wrong while trying to perform this operation',
                    debug: e.stack || ''
                };

                return res.status(400).json(response);
            }

        };

    }
}


module.exports = recordsController;
