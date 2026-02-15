const extractFormData = (formTarget) => {
  try {
    let formFields = {};
    let formData = new FormData(formTarget);
    for (let [key, val] of formData.entries()) {
      formFields[key] = val;
    }
    return formFields;
  } catch (error) {
    throw error;
  }
};

export default extractFormData;
