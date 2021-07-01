

# FireBase

## Main Focus:
<p> This fireside primarily focuses on uploading images locally using firebase storage! We will walk through the process of uploading an image from your local device to firebase and then retrieve that data to post into our own database. </p>

<ul>
<li> To get the firebase config you must go to firebase project setting and then your apps and create a web application
</li>
<li> put the firebase config in the env.js file, this will hold our configuration as well as export the storage method.
</li>
<li>The firebaseLogic.js will hold all of the actual logic to upload and retrieve images from firebase storage
</li>
<li> helpful video: https://www.youtube.com/watch?v=ZH-PnY-JGBU&t=775s&ab_channel=TACV-TheAmazingCode-Verse 
</li>
</ul>

//rule
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth == null;
    }
  }
}
