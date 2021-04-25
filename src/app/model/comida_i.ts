export interface ComidaI{
    food_id? : string;
    food_category: string;
    food_cost: string;
    food_description: string;
    food_image: string;
    food_name: string;

    /** Relaciones */
    restaurantId: string;
}