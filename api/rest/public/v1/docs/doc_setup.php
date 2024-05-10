<?php

/**
 * @OA\Info(
 *   title="API",
 *   description="TTCMS API",
 *   version="1.0",
 *   @OA\Contact(
 *     email="basar.carovac@stu.ibu.edu.ba",
 *     name="Basar Carovac"
 *   )
 * ),
 * @OA\OpenApi(
 *   @OA\Server(
 *       url=BASE_URL,
 *   )
 * )
 * @OA\SecurityScheme(
 *     securityScheme="ApiKeyAuth",
 *     type="apiKey",
 *     in="header",
 *     name="Authentication"
 * )
 */