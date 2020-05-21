import React from 'react';
import { Form, Button,Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

//Yup validation
const validationSchema = Yup.object().shape({
  name: Yup.string()
  .min(2, "*Names must have at least 2 characters")
  .max(100, "*Names can't be longer than 100 characters")
  .required("*Name is required"),
  vicinity: Yup.string()
  .min(10, "*Address must have at least 10 characters")
  .max(40, "*40 characters Maximum")
  .required("*Address is required"),
  rating: Yup.number()
  .min(1, "*A rating is required")
  .max(5, "*Five is the maximum rating")
  .required("*A rating is required")
});


function AddRestauraunt(props) {


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add A New Restauraunt Here
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
        initialValues={{ name:"", vicinity:"", rating:""}}
        validationSchema={validationSchema}
        onSubmit={(values, {setSubmitting, resetForm}) => {
            // When button submits form and form is in the process of submitting, submit button is disabled
            setSubmitting(true);

            // Simulate submitting to database, shows us values submitted, resets form
            const newPlace = values;
            // console.log("new Place", newPlace)
            props.createNewPlace(newPlace);
            resetForm();
            setSubmitting(false);
        }}
      >
        {/* Callback function containing Formik state and helpers that handle common form actions */}
      {( {values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting }) => (
        <Form onSubmit={handleSubmit} className="mx-auto">
          <Form.Group controlId="formName">
            <Form.Label>Name :</Form.Label>
            <Form.Control
              type="text"
              /* This name property is used to access the value of the form element via values.nameOfElement */
              name="name"
                placeholder="Restauraunt Name"
              /* Set onChange to handleChange */
              onChange={handleChange}
              /* Set onBlur to handleBlur */
              onBlur={handleBlur}
              /* Store the value of this input in values.name, make sure this is named the same as the name property on the form element */
              value={values.name}
              /* Check if the name field (this field) has been touched and if there is an error, if so add the .error class styles defined in the CSS (make the input box red) */
              className={touched.name && errors.name ? "error" : null}
              />
              {/* Applies the proper error message from validateSchema when the user has clicked the element and there is an error, also applies the .error-message CSS class for styling */}
              {touched.name && errors.name ? (
                <div className="error-message">{errors.name}</div>
              ): null}
          </Form.Group>
          <Form.Group controlId="formText">
            <Form.Label>Review :</Form.Label>
            <Form.Control
              type="textarea"
              name="vicinity"
              placeholder="Address"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.vicinity}
              className={touched.vicinity && errors.vicinity ? "error" : null}
              />
              {touched.vicinity && errors.vicinity ? (
                <div className="error-message">{errors.vicinity}</div>
              ): null}
          </Form.Group>
          <Form.Group controlId="formRating">
            <Form.Label>Rating :</Form.Label>
            <Form.Control
              type="number"
              name="rating"
              placeholder="rating"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.rating}
              className={touched.rating && errors.rating ? "error" : null}
              />
              {touched.rating && errors.rating ? (
                <div className="error-message">{errors.rating}</div>
              ): null}
          </Form.Group>
          <Button variant="primary" type="submit" disabled={isSubmitting} onClick={props.onHide} >
            Submit
          </Button>
        </Form>
      )}
      </Formik>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddRestauraunt;