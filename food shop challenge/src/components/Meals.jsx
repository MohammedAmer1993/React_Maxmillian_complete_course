import MealItem from "./MealItem";
import Error from "./Error";
import useHttp from "../hooks/useHttp";
const inialObj = {};
export default function Meals() {
  const {
    data: meals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", inialObj, []);

  if (isLoading) {
    return <div className="spinner"></div>;
  }
  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }
  return (
    <ul id="meals">
      {meals.map((meal) => (
        <MealItem meal={meal} key={meal.id} />
      ))}
    </ul>
  );
}
