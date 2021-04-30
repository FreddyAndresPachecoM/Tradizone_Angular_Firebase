export interface PlatoI{
    food_id? : string;
    food_category: string;
    food_cost: string;
    food_description: string;
    food_image: string;
    food_name: string;
    food_restaurant: string;
    food_state: boolean;

    /** Relaciones */
    restaurantId: string;
}