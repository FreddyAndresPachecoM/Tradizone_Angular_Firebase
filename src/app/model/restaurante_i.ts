export interface RestauranteI{
    uid? : string;
    restaurant_description : string;
    restaurant_image : string;
    restaurant_location : string;
    restaurant_name : string;
    restaurant_phone : string;
    restaurant_zone : string;

    /** Relaciones: */ 
    user_id : string;
}