/** @format */
const pageSize = 10;
let currentPage = 1;
let category = "";

function fetchingData(page) {
  $.ajax({
    url: `http://localhost:3000/api?page=${page}&category=${category}`,
    method: "GET",
    success: function (response) {
      displayData(response);
      pagination(response.totalPages, response.currentPage);
      Category(response.totalCategories);
    },
    error: function (error) {
      console.log(error.responseJSON.msg);
    },
  });
}

function Category(category) {
  const categorries = $("#pagination-category");
  categorries.empty();

  category.forEach((cat) => {
    categorries.append(`<tr>
  
    <td class="p-2">${cat.total}</td>
    <td class="p-2"><button class="p-0 border-0 btn btn-outline-light text-dark p-1" onclick="changeCategory('${cat.category}')">${cat.category}</button</td>
    
  </tr>`);
  });
}

function displayData(data) {
  const dataList = $("#data-body");
  dataList.empty();

  data.data.forEach((item, no) => {
    dataList.append(`<tr>
    <th scope="row">${no + 1}</th>
    <td class="p-2">${item.API}</td>
    <td class="p-2">${item.Description}</td>
    <td class="p-2"><a href="${item.Link}">${item.Link}</a></td>
    <td class="p-2">${item.Category}</td>
    <td class="p-1 d-flex justify-content-center"><span class="d-flex"><button class="btn btn-primary m-1" onclick="deleteData('${
      item._id
    }')">Delete</button><button class="btn btn-danger m-1" id="update" onclick="showUpdateModal('${
      item._id
    }')">Update</button></span></td>
  </tr>`);
  });
}

function pagination(totalPages, currentPage) {
  const pagination = $("#pagination-button");
  pagination.empty();

  const range = 3;
  const startPage = Math.max(1, currentPage - Math.floor(range / 2));
  const endPage = Math.min(totalPages, startPage + range - 1);

  pagination.append(
    `<button type="button" class="m-1 btn btn-secondary ${
      currentPage === 1 ? "disabled" : ""
    }" onclick="changePage(${1})">Last</button>`
  );

  for (let i = startPage; i <= endPage; i++) {
    const activeClass = i === currentPage ? "active" : "";
    pagination.append(
      `<button type="button" class="m-1 btn btn-secondary ${activeClass}" onclick="changePage(${i})">${i}</button>`
    );
  }

  pagination.append(
    `<button type="button" class="m-1 btn-secondary  btn ${
      currentPage === totalPages ? "disabled" : ""
    }" onclick="changePage(${totalPages})">Last</button>`
  );
}

function changePage(page) {
  currentPage = page;
  fetchingData(page);
}

function changeCategory(cat) {
  category = cat;
  fetchingData(category);
}

function deleteData(id) {
  $.ajax({
    url: `http://localhost:3000/api/${id}`,
    method: "DELETE",
    success: async function () {
      await Swal.fire({
        icon: "success",
        title: "Success",
        text: "Data loaded successfully",
      });
      fetchingData();
      console.log("Data deleted successfully");
    },
    error: function (error) {
      console.error("Error deleting data:", error);
    },
  });
}

function showUpdateModal(id) {
  const modal = $("#modal");
  modal.show();
  submitUpdatedData(id);
}

function submitUpdatedData(id) {
  const submit = $("#submit");
  const desc = $("#description");
  const link = $("#link");
  const category = $("#category");
  const api = $("#api");

  submit.on("click", async () => {
    if (api.val() === "" || desc.val() === "") {
      desc.css("border-color", "red");
      api.css("border-color", "red");

      link.css("border-color", "red");
      category.css("border-color", "red");
      return;
    }

    $.ajax({
      url: `http://localhost:3000/api/${id}`,
      method: "PATCH",
      data: {
        API: api.val(),
        Description: desc.val(),
        Link: link.val(),
        Category: category.val(),
      },
      success: async function () {
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: "Data loaded successfully",
        });
        fetchingData();

        $("#modal").hide();
      },
      error: function (error) {
        console.error("Error deleting data:", error);
      },
    });
  });
}

function addPost() {
  const submit = $("#add-submit");
  const desc = $("#add-description");
  const link = $("#add-link");
  const category = $("#add-category");
  const api = $("#add-api");

  submit.on("click", async () => {
    if (api.val() === "" || desc.val() === "") {
      desc.css("border-color", "red");
      api.css("border-color", "red");
      link.css("border-color", "red");
      category.css("border-color", "red");

      return;
    }

    $.ajax({
      url: `http://localhost:3000/api`,
      method: "POST",
      data: {
        API: api.val(),
        Description: desc.val(),
        Link: link.val(),
        Category: category.val(),
      },
      success: async function () {
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: "Data loaded successfully",
        });
        fetchingData();
        $("#add-data").hide();
      },
      error: function (error) {
        console.error("Error deleting data:", error);
      },
    });
  });
}

$(document).ready(() => {
  fetchingData(currentPage);
  addPost();
  $("#modal").hide();
  $("#add-data").hide();
  $("#add").on("click", () => {
    $("#add-data").show();
  });
});
