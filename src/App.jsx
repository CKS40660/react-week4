import axios from "axios";
import { useEffect, useRef, useState } from "react";
import * as bootstrap from "bootstrap";
import ProductModal from "./assets/components/ProductModal";
import TemplateModal from "./assets/components/TemplateModal";
import AlertModal from "./assets/components/AlertModal";
import Card from "./assets/components/Card";

// 定義參數
const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

// 宣告空白productForm
const emptyProduct = {
  id: "",
  title: "",
  category: "",
  content: "",
  description: "",
  imageUrl: "",
  imagesUrl: [],
  price: 0,
  origin_price: 0,
  unit: "個",
  is_enabled: false,
  storageNum: 0,
};

function App() {
  // const authRef = useRef;
  // 登入表單初始化（注意API需要傳遞的項目）
  const [authInput, setAuthInput] = useState({
    username: "",
    password: "",
  });
  // input改變刷新數值
  const getAuthInput = (e) => {
    // 不能直接用type，type會有其他屬性
    const { name, value } = e.target;
    // 記得加（）才能return
    setAuthInput((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // 是否為登入狀態
  const [isAuth, setIsAuth] = useState(false);
  // 呼叫登入API
  const checkLogin = async (e) => {
    e.preventDefault();
    try {
      // 成功登入
      const rep = await axios.post(`${API_BASE}/admin/signin`, authInput);
      // 更改登入狀態
      setIsAuth(true);
      // 解構rep資料拿到token,expire
      const { token, expired } = rep.data;
      // token存到cookie
      document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
      // 設定 axios 預設 header
      axios.defaults.headers.common.Authorization = `${token}`;
      getData();
    } catch (error) {
      console.error("登入失敗", error.response?.status, error.response?.data);
    }
  };

  // 登出
  const logout = () => {
    document.cookie = "hexToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    delete axios.defaults.headers.common.Authorization;
    setIsAuth(false);
  };
  // 設定products預設值
  const [products, setProducts] = useState([]);
  // 取得products資料，呼叫API
  const getData = async () => {
    try {
      const rep = await axios.get(`${API_BASE}/api/${API_PATH}/admin/products`);
      setProducts(rep.data.products);
    } catch (error) {
      console.error("獲取資料失敗", error.response);
    }
  };

  //product modal控制
  const productModalRef = useRef(null);
  const productModal = useRef(null);
  const [tempProduct, setTempProduct] = useState({});
  const openProductModal = (product) => {
    productModal.current.show();
    setTempProduct(product);
  };
  const closeProductModal = () => {
    productModal.current.hide();
  };
  // 新增、編輯modal控制
  // 建立表單
  const [templateForm, setTemplateForm] = useState(emptyProduct);
  const templateRef = useRef(null);
  const templateModal = useRef(null);
  const [formType, setFormType] = useState("create");
  const handleTemplateChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTemplateForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const openTemplateModal = (product = emptyProduct, type = "create") => {
    setFormType(type);
    setTemplateForm(type == "edit" ? product : emptyProduct);

    templateModal.current.show();
  };
  const closeTemplateModal = () => {
    templateModal.current.hide();
  };
  // 呼叫編輯、新增API
  const editForm = async () => {
    const payload = {
      ...templateForm,
      origin_price: Number(templateForm.origin_price),
      price: Number(templateForm.price),
      storageNum: Number(templateForm.storageNum),
      is_enabled: templateForm.is_enabled ? 1 : 0,
      imagesUrl: templateForm.imagesUrl || [],
    };
    try {
      if (formType == "edit") {
        // 修改
        await axios.put(
          `${API_BASE}/api/${API_PATH}/admin/product/${templateForm.id}`,
          { data: payload },
        );
      } else {
        await axios.post(`${API_BASE}/api/${API_PATH}/admin/product`, {
          data: payload,
        });
      }
      setTempProduct(payload);
      getData();
      closeTemplateModal();
    } catch (error) {
      console.error("表單更新失敗", error.response?.data || error);
    }
  };

  // alertModal控制
  const alertModalRef = useRef(null);
  const alertModal = useRef(null);
  const openAlertModal = () => {
    alertModal.current.show();
  };
  const closeAlertModal = () => {
    alertModal.current.hide();
  };

  // 呼叫刪除API
  const delForm = async () => {
    try {
      await axios.delete(
        `${API_BASE}/api/${API_PATH}/admin/product/${tempProduct.id}`,
      );
      closeAlertModal();
      closeProductModal();
      getData();
    } catch (error) {
      console.error("表單刪除失敗", error.response?.data || error);
    }
  };

  // useEffect
  // modal類要在refs宣告後面
  useEffect(() => {
    productModal.current = new bootstrap.Modal(productModalRef.current);
    templateModal.current = new bootstrap.Modal(templateRef.current);
    alertModal.current = new bootstrap.Modal(alertModalRef.current);
  }, []);
  // 維持登入狀態，F5不刷新
  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("hexToken="))
      ?.split("=")[1];
    if (token) {
      axios.defaults.headers.common.Authorization = token;
      setIsAuth(true);
      getData();
    }
  }, []);

  return (
    <>
      {isAuth ? (
        <>
          {/* 產品內頁 */}
          <div className="container text-center py-5">
            <header>
              <h1>賣場商品</h1>
              <div className="d-flex">
                <button
                  className="btn btn-primary ms-auto me-3"
                  onClick={() => openTemplateModal()}
                >
                  新增商品
                </button>
                <button className="btn btn-sm" onClick={logout}>
                  登出
                </button>
              </div>
            </header>
            <section className="py-5">
              <div className="row row-cols-2">
                {products.map((product) => {
                  return (
                    <div className="col g-3" key={product.id}>
                      <Card
                        product={product}
                        openProductModal={openProductModal}
                      />
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </>
      ) : (
        <>
          {/* 登入表單 */}
          <div className="container h-100 d-flex align-items-center justify-content-center">
            <form onSubmit={checkLogin}>
              <div className="mb-3">
                <label htmlFor="AuthInputEmail" className="form-label">
                  信箱
                </label>
                <input
                  type="email"
                  name="username"
                  className="form-control"
                  id="AuthInputEmail"
                  aria-describedby="emailHelp"
                  value={authInput.username}
                  onChange={(e) => getAuthInput(e)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="AuthInputPassword" className="form-label">
                  密碼
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="AuthInputPassword"
                  value={authInput.password}
                  onChange={(e) => getAuthInput(e)}
                  required
                />
              </div>
              <div className="d-flex">
                <button type="submit" className="btn btn-primary ms-auto">
                  登入
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      {/* product modal */}
      <ProductModal
        tempProduct={tempProduct}
        openAlertModal={openAlertModal}
        openTemplateModal={openTemplateModal}
        productModalRef={productModalRef}
      ></ProductModal>

      {/* template modal */}
      <TemplateModal
        editForm={editForm}
        templateForm={templateForm}
        closeTemplateModal={closeTemplateModal}
        handleTemplateChange={handleTemplateChange}
        templateRef={templateRef}
        formType={formType}
      ></TemplateModal>

      {/* alert modal */}
      <AlertModal
        delForm={delForm}
        closeAlertModal={closeAlertModal}
        alertModalRef={alertModalRef}
      ></AlertModal>
    </>
  );
}

export default App;
