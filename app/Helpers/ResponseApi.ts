export default class responseApi {
  structure = {
    status: "success",
    message: "",
    code: "200",
    results: null
  };

  constructor() {}

  setState = (code, status, message) => {
    this.structure.code = code;
    this.structure.status = status;
    this.structure.message = message;
  };

  setResult = (results) => {
    this.structure.results = results;
  };

  toResponse = () => {
    return {
      status: this.structure.status,
      message: this.structure.message,
      code: this.structure.code,
      results: this.structure.results,
    };
  };
}

