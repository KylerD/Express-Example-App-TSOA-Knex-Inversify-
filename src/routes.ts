/* tslint:disable */
import { Controller, ValidateParam, FieldErrors, ValidateError, TsoaRoute } from 'tsoa';
import { iocContainer } from './ioc';
import { PartyController } from './controllers/partyController';
import { PartyTypeController } from './controllers/partyTypeController';
import { WorkController } from './controllers/workController';
import { WorkStatusController } from './controllers/workStatusController';

const models: TsoaRoute.Models = {
    "Party": {
        "properties": {
            "party_id": { "dataType": "double", "required": true },
            "party_type_id": { "dataType": "double", "required": true },
            "name": { "dataType": "string", "required": true },
        },
    },
    "PartyCreateRequest": {
        "properties": {
            "party_type_id": { "dataType": "double", "required": true },
            "name": { "dataType": "string", "required": true },
        },
    },
    "PartyType": {
        "properties": {
            "party_type_id": { "dataType": "double", "required": true },
            "name": { "dataType": "string", "required": true },
            "enabled": { "dataType": "boolean", "required": true },
        },
    },
    "PartyTypeCreateRequest": {
        "properties": {
            "name": { "dataType": "string", "required": true },
            "enabled": { "dataType": "boolean", "required": true },
        },
    },
    "Work": {
        "properties": {
            "work_id": { "dataType": "double", "required": true },
            "reference": { "dataType": "string" },
            "party_id": { "dataType": "double", "required": true },
            "work_status_id": { "dataType": "double", "required": true },
            "date_created": { "dataType": "datetime", "required": true },
            "date_modified": { "dataType": "datetime", "required": true },
        },
    },
    "WorkCreateRequest": {
        "properties": {
            "reference": { "dataType": "string" },
            "party_id": { "dataType": "double", "required": true },
            "work_status_id": { "dataType": "double", "required": true },
            "date_created": { "dataType": "datetime" },
            "date_modified": { "dataType": "datetime" },
        },
    },
    "WorkStatus": {
        "properties": {
            "work_status_id": { "dataType": "double", "required": true },
            "name": { "dataType": "string", "required": true },
            "enabled": { "dataType": "boolean", "required": true },
        },
    },
    "WorkStatusCreateRequest": {
        "properties": {
            "name": { "dataType": "string", "required": true },
            "enabled": { "dataType": "boolean", "required": true },
        },
    },
};

export function RegisterRoutes(app: any) {
    app.get('/api/Party',
        function(request: any, response: any, next: any) {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<PartyController>(PartyController);
            if (typeof controller['setStatus'] === 'function') {
                (<any>controller).setStatus(undefined);
            }


            const promise = controller.getAll.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/api/Party/:partyId',
        function(request: any, response: any, next: any) {
            const args = {
                partyId: { "in": "path", "name": "partyId", "required": true, "dataType": "double" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<PartyController>(PartyController);
            if (typeof controller['setStatus'] === 'function') {
                (<any>controller).setStatus(undefined);
            }


            const promise = controller.getParty.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/api/Party',
        function(request: any, response: any, next: any) {
            const args = {
                requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "PartyCreateRequest" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<PartyController>(PartyController);
            if (typeof controller['setStatus'] === 'function') {
                (<any>controller).setStatus(undefined);
            }


            const promise = controller.createParty.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/api/PartyType',
        function(request: any, response: any, next: any) {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<PartyTypeController>(PartyTypeController);
            if (typeof controller['setStatus'] === 'function') {
                (<any>controller).setStatus(undefined);
            }


            const promise = controller.getAll.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/api/PartyType/:partyTypeId',
        function(request: any, response: any, next: any) {
            const args = {
                partyTypeId: { "in": "path", "name": "partyTypeId", "required": true, "dataType": "double" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<PartyTypeController>(PartyTypeController);
            if (typeof controller['setStatus'] === 'function') {
                (<any>controller).setStatus(undefined);
            }


            const promise = controller.getPartyType.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/api/PartyType',
        function(request: any, response: any, next: any) {
            const args = {
                requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "PartyTypeCreateRequest" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<PartyTypeController>(PartyTypeController);
            if (typeof controller['setStatus'] === 'function') {
                (<any>controller).setStatus(undefined);
            }


            const promise = controller.createPartyType.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/api/Work',
        function(request: any, response: any, next: any) {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<WorkController>(WorkController);
            if (typeof controller['setStatus'] === 'function') {
                (<any>controller).setStatus(undefined);
            }


            const promise = controller.getAll.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/api/Work/:workId',
        function(request: any, response: any, next: any) {
            const args = {
                workId: { "in": "path", "name": "workId", "required": true, "dataType": "double" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<WorkController>(WorkController);
            if (typeof controller['setStatus'] === 'function') {
                (<any>controller).setStatus(undefined);
            }


            const promise = controller.getWork.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/api/Work',
        function(request: any, response: any, next: any) {
            const args = {
                requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "WorkCreateRequest" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<WorkController>(WorkController);
            if (typeof controller['setStatus'] === 'function') {
                (<any>controller).setStatus(undefined);
            }


            const promise = controller.createWork.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/api/WorkStatus',
        function(request: any, response: any, next: any) {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<WorkStatusController>(WorkStatusController);
            if (typeof controller['setStatus'] === 'function') {
                (<any>controller).setStatus(undefined);
            }


            const promise = controller.getAll.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/api/WorkStatus/:workStatusId',
        function(request: any, response: any, next: any) {
            const args = {
                workStatusId: { "in": "path", "name": "workStatusId", "required": true, "dataType": "double" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<WorkStatusController>(WorkStatusController);
            if (typeof controller['setStatus'] === 'function') {
                (<any>controller).setStatus(undefined);
            }


            const promise = controller.getWorkStatus.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/api/WorkStatus',
        function(request: any, response: any, next: any) {
            const args = {
                requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "WorkStatusCreateRequest" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<WorkStatusController>(WorkStatusController);
            if (typeof controller['setStatus'] === 'function') {
                (<any>controller).setStatus(undefined);
            }


            const promise = controller.createWorkStatus.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });


    function promiseHandler(controllerObj: any, promise: any, response: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode;
                if (controllerObj instanceof Controller) {
                    const controller = controllerObj as Controller
                    const headers = controller.getHeaders();
                    Object.keys(headers).forEach((name: string) => {
                        response.set(name, headers[name]);
                    });

                    statusCode = controller.getStatus();
                }

                if (data) {
                    response.status(statusCode || 200).json(data);
                } else {
                    response.status(statusCode || 204).end();
                }
            })
            .catch((error: any) => next(error));
    }

    function getValidatedArgs(args: any, request: any): any[] {
        const fieldErrors: FieldErrors = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return ValidateParam(args[key], request.query[name], models, name, fieldErrors);
                case 'path':
                    return ValidateParam(args[key], request.params[name], models, name, fieldErrors);
                case 'header':
                    return ValidateParam(args[key], request.header(name), models, name, fieldErrors);
                case 'body':
                    return ValidateParam(args[key], request.body, models, name, fieldErrors, name + '.');
                case 'body-prop':
                    return ValidateParam(args[key], request.body[name], models, name, fieldErrors, 'body.');
            }
        });
        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }
}
