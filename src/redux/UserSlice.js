import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "./config/config";
import { Notify } from "../component/Register";
import { NotifyLogin } from "../component/Login";

export const register = createAsyncThunk("posts/register", async (data) => {
  console.log(data);
  const body = {
    name: data.Name,
    email: data.email,
    password: data.password,
  };
  instance
    .post("/register", body)
    .then((res) => {
      Notify(res.data.message);
    })
    .catch((error) => {
      console.log(error.response.data.error);
      Notify(error.response.data.error);
    });
});

export const Loginuser = createAsyncThunk("post/Loginuser", async (data) => {
  const body = {
    email: data.email,
    password: data.password,
  };

  return instance
    .post("/login", body) //login or register ka liya post hi aaya ga
    .then((res) => {
      NotifyLogin("user Login successfully");
      sessionStorage.setItem("token", JSON.stringify(res.data.token));
      return res.data.token;
    })
    .catch((error) => {
      console.log(error);
      NotifyLogin("Please Try Again");
    });
});

export const getPost = createAsyncThunk("get/getPost", async () => {
  return instance
    .get("/get")
    .then((res) => {
      console.log("success", res.data);
      return res.data;
    })
    .catch((error) => {
      console.log(error.message);
    });
});

export const Delete = createAsyncThunk("delete/Delete", async (Id) => {
  return instance
    .delete(`/delete/${Id}`)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
});

export const viewData = createAsyncThunk("get/viewData", async (Id) => {
  return instance
    .get(`/get/${Id}`)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
});

export const updateData = createAsyncThunk(
  "put/updateData",
  async ({ ids, Text }) => {
    const data = instance
      .put(`/update/${ids}`, { name: Text })
      .then((res) => {
        console.log("success", res.data);
        return res.data;
      })
      .catch((error) => {
        console.log("error", error);
      });
    return data;
  }
);

export const postData = createAsyncThunk(
  "post/PostData",
  async ({ name, age, city }) => {
    const body = {
      name,
      age,
      city,
    };
    const data = instance
      .post("/post", body)
      .then((res) => {
        console.log("success", res.data);
        return res.data;
      })
      .catch((error) => {
        console.log("error", error);
      });
    return data;
  }
);

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    token: null,
    data: [],
    error: null,
    del: "",
    singledata: [],
    updatecheck: "",
    post: "",
  },
  extraReducers: {
    [register.pending]: (state, action) => {},
    [register.fulfilled]: (state, action) => {},
    [register.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [Loginuser.pending]: (state, action) => {},
    [Loginuser.fulfilled]: (state, action) => {
      state.token = action.payload;
    },
    [Loginuser.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [getPost.pending]: (state, action) => {},
    [getPost.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
    [getPost.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [Delete.pending]: (state, action) => {},
    [Delete.fulfilled]: (state, action) => {
      state.del = action.payload;
    },
    [Delete.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [viewData.pending]: (state, action) => {},
    [viewData.fulfilled]: (state, action) => {
      state.singledata = action.payload;
    },
    [viewData.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [updateData.pending]: (state, action) => {},
    [updateData.fulfilled]: (state, action) => {
      state.updatecheck = action.payload;
    },
    [updateData.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [postData.pending]: (state, action) => {},
    [postData.fulfilled]: (state, action) => {
      state.del = action.payload;
    },
    [postData.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
