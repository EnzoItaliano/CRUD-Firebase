import firebase from "../firebase";
import "firebase/database";
import "firebase/storage";

const database = firebase.database();
const projectStorage = firebase.storage();
const storageRef = projectStorage.ref("/profissionais");

const db = database.ref("/profissionais");

const uploadImage = async (email, file) => {
  try {
    var uploadTask = await storageRef.child(email).put(file);
    let fileType = file.type.split('/')
    let downloadURL = await storageRef.child(`${email}`).getDownloadURL()
    return downloadURL;
  } catch (error) {
    console.log("error", error);
  }
}

const deleteImage = async (email) => {
  try {
    var imageRef = storageRef.child(email);
    imageRef.delete().then(function() {
      // File deleted successfully
    }).catch(function(error) {
      // Uh-oh, an error occurred!
    });
  } catch (error){
    console.log("Error", error);
  }
}

const getAll = () => {
  return db;
};

const create = (data) => {
  return db.push(data);
};

const update = (key, data) => {
  return db.child(key).update(data);
};

const remove = (key) => {
  return db.child(key).remove();
};

const removeAll = () => {
  return db.remove();
};

const Profissional = {
  getAll,
  create,
  update,
  remove,
  removeAll,
  uploadImage,
  deleteImage
};

export default Profissional;
