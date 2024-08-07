import { useState, useEffect, useContext } from "react";
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
import fireSwal from "../../utils/swalUtil";
import { useNavigate } from "react-router-dom";
import { CreateRecipeFormValues } from "../../types/recipes/recipeDTOs";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";

export default function CreateRecipe() {
  const [ingredientsByCategories, setIngredientsByCategories] = useState<
    IngredientsByCategory[]
  >([]);
  const [selectedIngredients, setSelectedIngredients] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchIngredientsByCategories();
        setIngredientsByCategories(result);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
    setSelectedIngredients((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  const handleCreateRecipe = async (values: CreateRecipeFormValues) => {
    const formData = new FormData();

    formData.append("name", values.recipeName);
    formData.append("username", authContext?.user?.username as string);
    selectedIngredients.forEach((i) => {
      formData.append("ingredientIds", i.toString());
    });
    values.instructions.forEach((i) => {
      formData.append("instructions", i);
    });
    if (values.image && values.image[0]) {
      formData.append("image", values.image[0].originFileObj as any);
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/Recipes/createRecipe`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      fireSwal(
        response.data,
        "You can go back to browsing recipes!",
        "success",
        navigate,
        "/recipes"
      );
    } catch (e) {
      fireSwal("Something went wrong!", "Please try again!", "error", navigate);
    }
  };

  return (
    <div className="create-recipe-hero">
      <div className="create-recipe-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="ingredients-container">
              {ingredientsByCategories.map((x) => (
                <IngredientsCatalog
                  ingredientsByCategory={x}
                  key={x.categoryName}
                  onIngredientSelect={handleIngredientSelect}
                  selectedIngredients={selectedIngredients}
                />
              ))}
            </div>
            <div className="create-recipe-form">
              <Form onFinish={handleCreateRecipe}>
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

                <Form.Item
                  name="image"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  rules={[
                    { required: true, message: "Please upload recipe photo!" },
                  ]}
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
                      Upload recipe photo
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
          </>
        )}
      </div>
    </div>
  );
}
