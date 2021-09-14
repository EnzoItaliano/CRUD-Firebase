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
    // uploadTask.on('state_changed', function(snapshot){
    //   // Observe state change events such as progress, pause, and resume
    //   // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    //   var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //   console.log('Upload is ' + progress + '% done');
    // }, function(error) {
    //   // Handle unsuccessful uploads
    // }, function() {
    //   // Handle successful uploads on complete
    //   // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    //   uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
    //   });
    // });
    // alert("Successfully uploaded picture!");
    return downloadURL;
  } catch (error) {
    console.log("error", error);
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
  uploadImage
};

export default Profissional;
