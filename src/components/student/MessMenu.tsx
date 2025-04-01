
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface MealItem {
  name: string;
  description: string;
  isVegetarian?: boolean;
}

interface DailyMenu {
  breakfast: MealItem[];
  lunch: MealItem[];
  dinner: MealItem[];
}

const weeklyMenu: Record<string, DailyMenu> = {
  monday: {
    breakfast: [
      { name: "Idli with Sambar", description: "Steamed rice cakes with lentil soup", isVegetarian: true },
      { name: "Coconut Chutney", description: "Fresh coconut chutney", isVegetarian: true },
      { name: "Boiled Eggs", description: "Protein rich boiled eggs" },
      { name: "Tea/Coffee", description: "Hot beverages", isVegetarian: true },
    ],
    lunch: [
      { name: "Rice", description: "Steamed white rice", isVegetarian: true },
      { name: "Dal Tadka", description: "Yellow lentils with spices", isVegetarian: true },
      { name: "Mixed Vegetable Curry", description: "Seasonal vegetables cooked with spices", isVegetarian: true },
      { name: "Chicken Curry", description: "Tender chicken pieces in flavorful gravy" },
      { name: "Curd", description: "Fresh yogurt", isVegetarian: true },
      { name: "Papad", description: "Crispy thin wafer", isVegetarian: true },
    ],
    dinner: [
      { name: "Chapati", description: "Whole wheat flat bread", isVegetarian: true },
      { name: "Paneer Butter Masala", description: "Cottage cheese in rich tomato gravy", isVegetarian: true },
      { name: "Jeera Rice", description: "Cumin flavored rice", isVegetarian: true },
      { name: "Green Salad", description: "Fresh vegetable salad", isVegetarian: true },
      { name: "Fruit Custard", description: "Sweet custard with fruits", isVegetarian: true },
    ],
  },
  tuesday: {
    breakfast: [
      { name: "Poha", description: "Flattened rice with vegetables", isVegetarian: true },
      { name: "Bread Toast", description: "Toasted bread with butter", isVegetarian: true },
      { name: "Boiled Eggs", description: "Protein rich boiled eggs" },
      { name: "Tea/Coffee", description: "Hot beverages", isVegetarian: true },
    ],
    lunch: [
      { name: "Rice", description: "Steamed white rice", isVegetarian: true },
      { name: "Rajma Curry", description: "Kidney beans curry", isVegetarian: true },
      { name: "Aloo Gobi", description: "Potato and cauliflower curry", isVegetarian: true },
      { name: "Fish Curry", description: "Fish pieces cooked in tangy sauce" },
      { name: "Curd", description: "Fresh yogurt", isVegetarian: true },
      { name: "Pickle", description: "Mixed vegetable pickle", isVegetarian: true },
    ],
    dinner: [
      { name: "Chapati", description: "Whole wheat flat bread", isVegetarian: true },
      { name: "Dal Makhani", description: "Creamy black lentils", isVegetarian: true },
      { name: "Veg Pulao", description: "Vegetable rice pilaf", isVegetarian: true },
      { name: "Raita", description: "Yogurt with cucumber", isVegetarian: true },
      { name: "Gulab Jamun", description: "Sweet milk dumplings", isVegetarian: true },
    ],
  },
  wednesday: {
    breakfast: [
      { name: "Upma", description: "Savory semolina porridge", isVegetarian: true },
      { name: "Bread Omelette", description: "Eggs with bread" },
      { name: "Banana", description: "Fresh fruit", isVegetarian: true },
      { name: "Tea/Coffee", description: "Hot beverages", isVegetarian: true },
    ],
    lunch: [
      { name: "Rice", description: "Steamed white rice", isVegetarian: true },
      { name: "Sambar", description: "Lentil and vegetable stew", isVegetarian: true },
      { name: "Bhindi Fry", description: "Crispy okra", isVegetarian: true },
      { name: "Egg Curry", description: "Boiled eggs in spicy gravy" },
      { name: "Buttermilk", description: "Diluted yogurt drink", isVegetarian: true },
      { name: "Papad", description: "Crispy thin wafer", isVegetarian: true },
    ],
    dinner: [
      { name: "Chapati", description: "Whole wheat flat bread", isVegetarian: true },
      { name: "Chana Masala", description: "Spiced chickpea curry", isVegetarian: true },
      { name: "Plain Rice", description: "Steamed white rice", isVegetarian: true },
      { name: "Green Salad", description: "Fresh vegetable salad", isVegetarian: true },
      { name: "Semiya Kheer", description: "Vermicelli pudding", isVegetarian: true },
    ],
  },
  thursday: {
    breakfast: [
      { name: "Puri Bhaji", description: "Deep fried bread with potato curry", isVegetarian: true },
      { name: "Boiled Eggs", description: "Protein rich boiled eggs" },
      { name: "Fruit Bowl", description: "Assorted fruits", isVegetarian: true },
      { name: "Tea/Coffee", description: "Hot beverages", isVegetarian: true },
    ],
    lunch: [
      { name: "Rice", description: "Steamed white rice", isVegetarian: true },
      { name: "Dal Fry", description: "Yellow lentils", isVegetarian: true },
      { name: "Mixed Veg Curry", description: "Assorted vegetables", isVegetarian: true },
      { name: "Mutton Curry", description: "Slow cooked mutton in rich gravy" },
      { name: "Curd", description: "Fresh yogurt", isVegetarian: true },
      { name: "Pickle", description: "Mixed vegetable pickle", isVegetarian: true },
    ],
    dinner: [
      { name: "Chapati", description: "Whole wheat flat bread", isVegetarian: true },
      { name: "Matar Paneer", description: "Peas and cottage cheese curry", isVegetarian: true },
      { name: "Zeera Rice", description: "Cumin rice", isVegetarian: true },
      { name: "Raita", description: "Yogurt with vegetables", isVegetarian: true },
      { name: "Rasmalai", description: "Milk dumplings in sweet milk", isVegetarian: true },
    ],
  },
  friday: {
    breakfast: [
      { name: "Dosa", description: "Fermented rice crepe", isVegetarian: true },
      { name: "Sambar", description: "Lentil and vegetable stew", isVegetarian: true },
      { name: "Boiled Eggs", description: "Protein rich boiled eggs" },
      { name: "Tea/Coffee", description: "Hot beverages", isVegetarian: true },
    ],
    lunch: [
      { name: "Rice", description: "Steamed white rice", isVegetarian: true },
      { name: "Dal Tadka", description: "Yellow lentils with spices", isVegetarian: true },
      { name: "Aloo Matar", description: "Potato and pea curry", isVegetarian: true },
      { name: "Chicken Curry", description: "Tender chicken pieces in flavorful gravy" },
      { name: "Curd", description: "Fresh yogurt", isVegetarian: true },
      { name: "Papad", description: "Crispy thin wafer", isVegetarian: true },
    ],
    dinner: [
      { name: "Chapati", description: "Whole wheat flat bread", isVegetarian: true },
      { name: "Veg Kofta", description: "Vegetable dumplings in gravy", isVegetarian: true },
      { name: "Plain Rice", description: "Steamed white rice", isVegetarian: true },
      { name: "Green Salad", description: "Fresh vegetable salad", isVegetarian: true },
      { name: "Ice Cream", description: "Vanilla ice cream", isVegetarian: true },
    ],
  },
  saturday: {
    breakfast: [
      { name: "Paratha", description: "Stuffed flatbread", isVegetarian: true },
      { name: "Curd", description: "Fresh yogurt", isVegetarian: true },
      { name: "Boiled Eggs", description: "Protein rich boiled eggs" },
      { name: "Tea/Coffee", description: "Hot beverages", isVegetarian: true },
    ],
    lunch: [
      { name: "Veg Biryani", description: "Mixed vegetable rice", isVegetarian: true },
      { name: "Chicken Biryani", description: "Chicken and rice dish" },
      { name: "Raita", description: "Yogurt with vegetables", isVegetarian: true },
      { name: "Salan", description: "Tangy curry", isVegetarian: true },
      { name: "Roasted Papad", description: "Roasted thin wafer", isVegetarian: true },
    ],
    dinner: [
      { name: "Chapati", description: "Whole wheat flat bread", isVegetarian: true },
      { name: "Mix Dal", description: "Mixed lentils", isVegetarian: true },
      { name: "Jeera Rice", description: "Cumin rice", isVegetarian: true },
      { name: "Veg Manchurian", description: "Vegetable balls in spicy sauce", isVegetarian: true },
      { name: "Fruit Custard", description: "Sweet custard with fruits", isVegetarian: true },
    ],
  },
  sunday: {
    breakfast: [
      { name: "Chole Bhature", description: "Spiced chickpeas with fried bread", isVegetarian: true },
      { name: "Fruit Bowl", description: "Assorted fruits", isVegetarian: true },
      { name: "Boiled Eggs", description: "Protein rich boiled eggs" },
      { name: "Tea/Coffee", description: "Hot beverages", isVegetarian: true },
    ],
    lunch: [
      { name: "Rice", description: "Steamed white rice", isVegetarian: true },
      { name: "Paneer Butter Masala", description: "Cottage cheese in rich gravy", isVegetarian: true },
      { name: "Dal Tadka", description: "Yellow lentils with spices", isVegetarian: true },
      { name: "Fish Fry", description: "Crispy fried fish" },
      { name: "Raita", description: "Yogurt with vegetables", isVegetarian: true },
      { name: "Papad", description: "Crispy thin wafer", isVegetarian: true },
    ],
    dinner: [
      { name: "Butter Naan", description: "Buttered leavened bread", isVegetarian: true },
      { name: "Butter Chicken", description: "Chicken in rich tomato gravy" },
      { name: "Paneer Tikka Masala", description: "Grilled cottage cheese in spicy gravy", isVegetarian: true },
      { name: "Pulao", description: "Flavored rice", isVegetarian: true },
      { name: "Gulab Jamun", description: "Sweet milk dumplings", isVegetarian: true },
    ],
  },
};

const DailyMenu: React.FC<{ menu: DailyMenu }> = ({ menu }) => {
  return (
    <div className="space-y-8">
      {/* Breakfast */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Breakfast (7:30 AM - 9:00 AM)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {menu.breakfast.map((item, i) => (
            <div key={i} className="flex items-start space-x-3 p-3 rounded-md border">
              {item.isVegetarian !== undefined && (
                <span className={`w-3 h-3 mt-1.5 rounded-full ${item.isVegetarian ? 'bg-green-500' : 'bg-red-500'}`}></span>
              )}
              <div>
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Lunch */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Lunch (12:30 PM - 2:00 PM)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {menu.lunch.map((item, i) => (
            <div key={i} className="flex items-start space-x-3 p-3 rounded-md border">
              {item.isVegetarian !== undefined && (
                <span className={`w-3 h-3 mt-1.5 rounded-full ${item.isVegetarian ? 'bg-green-500' : 'bg-red-500'}`}></span>
              )}
              <div>
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Dinner */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Dinner (7:30 PM - 9:00 PM)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {menu.dinner.map((item, i) => (
            <div key={i} className="flex items-start space-x-3 p-3 rounded-md border">
              {item.isVegetarian !== undefined && (
                <span className={`w-3 h-3 mt-1.5 rounded-full ${item.isVegetarian ? 'bg-green-500' : 'bg-red-500'}`}></span>
              )}
              <div>
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MessMenu: React.FC = () => {
  const getDayOfWeek = () => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = new Date().getDay();
    return days[today];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mess Menu</CardTitle>
        <CardDescription>Weekly menu for hostel dining hall</CardDescription>
        <div className="mt-2">
          <span className="inline-flex items-center mr-4">
            <span className="w-3 h-3 mr-2 rounded-full bg-green-500"></span>
            <span className="text-sm">Vegetarian</span>
          </span>
          <span className="inline-flex items-center">
            <span className="w-3 h-3 mr-2 rounded-full bg-red-500"></span>
            <span className="text-sm">Non-Vegetarian</span>
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={getDayOfWeek()} className="w-full">
          <TabsList className="w-full grid grid-cols-7">
            <TabsTrigger value="monday">Mon</TabsTrigger>
            <TabsTrigger value="tuesday">Tue</TabsTrigger>
            <TabsTrigger value="wednesday">Wed</TabsTrigger>
            <TabsTrigger value="thursday">Thu</TabsTrigger>
            <TabsTrigger value="friday">Fri</TabsTrigger>
            <TabsTrigger value="saturday">Sat</TabsTrigger>
            <TabsTrigger value="sunday">Sun</TabsTrigger>
          </TabsList>
          {Object.entries(weeklyMenu).map(([day, menu]) => (
            <TabsContent key={day} value={day}>
              <DailyMenu menu={menu} />
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MessMenu;
