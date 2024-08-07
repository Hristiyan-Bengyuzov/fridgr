import { useState, useEffect } from "react";
import { IngredientsByCategory } from "../../types/ingredients/ingredientDTOs";
import { fetchIngredientsByCategories } from "../../services/ingredients/ingredientService";
import IngredientsCatalog from "../Ingredients/IngredientsCatalog";
import { Form, Input, Space, Upload, Button } from "antd";
import { UploadFile } from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "../../assets/styles/Recipes.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  CreateRecipeFormValues,
  EditRecipeDTO,
} from "../../types/recipes/recipeDTOs";
import { editRecipe } from "../../services/recipes/recipeService";

export default function EditRecipe() {
  const [ingredientsByCategories, setIngredientsByCategories] = useState<
    IngredientsByCategory[]
  >([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [recipeData, setRecipeData] = useState<EditRecipeDTO | null>(null);
  const navigate = useNavigate();
  const { recipeId } = useParams<{ recipeId: string }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ingredientsResult = await fetchIngredientsByCategories();
        setIngredientsByCategories(ingredientsResult);

        const recipeResult = await axios.get<EditRecipeDTO>(
          `${
            import.meta.env.VITE_API_URL
          }/api/Recipes/getRecipeEditDTO/${recipeId}`
        );
        setRecipeData(recipeResult.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [recipeId]);

  const handleFileChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList);
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleIngredientSelect = (id: number) => {
    if (!recipeData) return;

    const updatedIngredientIds = recipeData.ingredientIds.includes(id)
      ? recipeData.ingredientIds.filter((ingredientId) => ingredientId !== id)
      : [...recipeData.ingredientIds, id];

    setRecipeData({
      ...recipeData,
      ingredientIds: updatedIngredientIds,
    });
  };

  const handleEditSumbit = async (values: CreateRecipeFormValues) => {
    if (recipeData) {
      await editRecipe(values, recipeData, navigate);
    }
  };

  return (
    <>
      {recipeData ? (
        <div className="create-recipe-hero">
          <div className="create-recipe-container">
            <div className="ingredients-container">
              {ingredientsByCategories.map((x) => (
                <IngredientsCatalog
                  ingredientsByCategory={x}
                  key={x.categoryName}
                  onIngredientSelect={handleIngredientSelect}
                  selectedIngredients={recipeData.ingredientIds}
                />
              ))}
            </div>
            <div className="create-recipe-form">
              <Form
                onFinish={handleEditSumbit}
                initialValues={{
                  recipeName: recipeData?.name,
                  instructions: recipeData?.instructions,
                }}
              >
                <Form.Item
                  name="recipeName"
                  rules={[
                    { required: true, message: "Please enter the recipe name" },
                  ]}
                >
                  <Input placeholder="Recipe Name" />
                </Form.Item>
                <Form.List name="instructions">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map((field) => (
                        <Space
                          key={field.key}
                          style={{ display: "flex", marginBottom: 8 }}
                          align="baseline"
                        >
                          <Form.Item
                            {...field}
                            rules={[
                              {
                                required: true,
                                message: "Please enter an instruction",
                              },
                            ]}
                          >
                            <Input placeholder="Instruction" />
                          </Form.Item>
                          <MinusCircleOutlined
                            className="minus-circle"
                            onClick={() => remove(field.name)}
                          />
                        </Space>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        >
                          Add Instruction
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>

                <div className="previous-image-container">
                  <img
                    src={recipeData?.image}
                    alt="Previous recipe"
                    style={{ width: "100px", height: "100px" }}
                  />
                  <p className="white-text">Previous recipe photo</p>
                </div>

                <Form.Item
                  name="image"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  <Upload
                    name="image"
                    listType="picture"
                    maxCount={1}
                    fileList={fileList}
                    beforeUpload={() => false}
                    onChange={handleFileChange}
                  >
                    <Button icon={<UploadOutlined />}>
                      Upload new recipe photo
                    </Button>
                  </Upload>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
