import * as fs from 'fs';
import * as path from 'path';

function convertToOpenAPI(jsonData: any): any {
  const openAPI = {
    openapi: '3.0.0',
    info: {
      title: 'Generated API',
      version: '1.0.0',
      description: 'This API was generated from custom JSON data.',
    },
    paths: {},
    components: {
      schemas: {},
    },
  };

  jsonData.forEach((controllerData: any) => {
    const GroupName: string = controllerData.controller || 'default';
    const controllerName = GroupName.split(' ').join('-')
    controllerData.methods.forEach((method: any) => {
      const path = `/${controllerName}/${method.name}/${method.input.params.map((param: string) => `{${param}}`).join('/')}`;
      const httpMethod = method.name.startsWith('get')
        ? 'get'
        : method.name.startsWith('post')
          ? 'post'
          : method.name.startsWith('put')
            ? 'put'
            : method.name.startsWith('delete')
              ? 'delete'
              : 'get';
      if (!openAPI.paths[path]) {

        openAPI.paths[path] = {};
      }

      openAPI.paths[path][httpMethod] = {
        summary: `${method.name} operation for ${controllerName}`,
        tags: [GroupName],
        parameters: [],
        requestBody: method.input.body.length
          ? {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: method.input.body.reduce((acc: any, bodyField: any) => {
                    Object.keys(bodyField).forEach((key) => {
                      acc[key] = { type: typeof bodyField[key] === 'number' ? 'integer' : 'string' };
                    });
                    return acc;
                  }, {}),
                },

              },
            },
          }
          : undefined,
        responses: {
          200: {
            description: 'Successful response',
          },
        },
      };

      // Add parameters (query, headers, params)
      if (method.input.params) {
        method.input.params.forEach((param: string) => {
          openAPI.paths[path][httpMethod].parameters.push({
            name: param,
            in: 'path',
            required: true,
            schema: { type: 'string' },
          });
        });
      }

      if (method.input.query) {
        method.input.query.forEach((query: string) => {
          openAPI.paths[path][httpMethod].parameters.push({
            name: query,
            in: 'query',
            required: false,
            schema: { type: 'string' },
          });
        });
      }

      if (method.input.headers) {
        method.input.headers.forEach((header: string) => {
          openAPI.paths[path][httpMethod].parameters.push({
            name: header,
            in: 'header',
            required: false,
            schema: { type: 'string' },
          });
        });
      }
      if (method.input.jwt && method.input.jwt.length > 0) {
        openAPI.paths[path][httpMethod].security = [
          {
            bearerAuth: [], // Định nghĩa bảo mật JWT
          },
        ];
        if (!openAPI.components["securitySchemes"]) {
          openAPI.components["securitySchemes"] = {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              description: 'JWT Authorization header using the Bearer scheme.',
            },
          };
        }
      }
    });
  });

  return openAPI;
}

// Đọc file JSON và chuyển đổi
const filePath = path.join(process.cwd(), '/docs/swagger.json');

if (!fs.existsSync(filePath)) {
  console.error('⚠️ swagger.json file not found at:', filePath);
}
const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
const openAPI = convertToOpenAPI(jsonData);
const outfilePath = path.join(process.cwd(), '/docs/openapi.json');
// Ghi file OpenAPI 3.0
fs.writeFileSync(outfilePath, JSON.stringify(openAPI, null, 2));
console.log('OpenAPI 3.0 file generated at ./docs/openapi.json');