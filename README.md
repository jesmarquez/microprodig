# microprodig
Microservicio desarrollado en NodeJS versión 14 (Typescript) usando ExpressJS. La base de datos es mysql y se uso los datos públicos localizado en **https://data.world/bob-burggraaf/population-by-city-in-usa**

El despliegue fue realizado en Amazon Web Service sobre una EC2 (Ubuntu) y la base de datos en una RDS (mysql).

El CRUD tiene el propósito:

* Consultar todos los datos demográficos de las ciudades en EEUU.
* Consultar los datos de una ciudad por medio de un ID.
* Incluir una ciudad.
* Actualizar la población total de una ciudad mediante un ID.
* Borrar una ciudad por un ID.

## Docker image

La imagen docker se encuentra en **https://hub.docker.com/repository/docker/jesmqz/microprodig**

Ejecute los siguientes comandos:

~~~bash
# primero construya la imagen
docker build -t jesmqz/microprodig .
# ejecutarlo
docker run -it -p 4000:3000 microprodig
~~~

## Ejecutar localmente

Para comenzar clone y ejecute `npm install && npm run dev`:

    git clone 
    npm install
    

Para iniciar el proyecto en modo desarrollo:

    npm run dev


## Endpoint 


#### GET /population/{id}

*Obtener datos demográficos de una ciudad por una id*

###### Request
`http://localhost:7000/population/140`
`http://3.18.70.254:7000/population/140`

###### Response

Return a JSON array.
```json
{
    "data": {
        "id": 277,
        "city": "Ugashik",
        "geoId": "16000US0280100",
        "state": "AK",
        "totalPopulation": 8800
    }
}

```
#### GET /population

*Obtiene todas las ciudades.* 

###### Request
`http://localhost:7000/population`
`http://3.18.70.254:7000/population`

##### Response JSON
Return a JSON array.
```json
    "data": [
        {
            "id": 1,
            "city": "city",
            "geoId": "geo_id",
            "state": "st",
            "totalPopulation": 0
        },
        {
            "id": 2,
            "city": "Cohoe",
            "geoId": "16000US0216420",
            "state": "AK",
            "totalPopulation": 8000
        },
        ...
```


#### POST /population

*Guarda datos de una ciudad*

##### Request

`http://localhost:7000/population` 
`http://3.18.70.254:7000/population`

Body JSON

```json
 "city": "Opartwa",
 "geoId": "16000US0777777",
 "state": "FL",
 "totalPopulation": 80000
```

##### Response

Status & error code

* 200 Ok

* 404 Not found

Body
```
{
  "populationId": 673
}
```
#### PUT /population/{id}

*Actualiza el total de población*

##### Request

Body JSON

```json
  "id": 2,
  "totalPopulation": 8000
```
##### Response

Status & error code

* 200 Ok
* 404 NOT_FOUND

#### DELETE /population/{id}

*Elimina un registro de la ciudad.*

##### Request

Parameter

**id** record id

##### Response

Status & error code

* 200 Ok
* 404 NOT FOUND
