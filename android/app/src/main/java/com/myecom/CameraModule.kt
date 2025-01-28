package com.myecom

import android.app.Activity
import android.content.Intent
import android.os.Environment
import androidx.core.content.FileProvider
import com.facebook.react.bridge.*
import java.io.File
import java.text.SimpleDateFormat
import java.util.*
import android.Manifest
import android.content.pm.PackageManager
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.*

class CameraModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), ActivityEventListener {

    companion object {
        const val REQUEST_CAMERA_CODE = 1001
        var currentPhotoPath: String? = null
    }

    private var promise: Promise? = null

    init {
        reactContext.addActivityEventListener(this)
    }

    override fun getName(): String {
        return "CameraModule"
    }

    @ReactMethod
    fun openCamera(promise: Promise) {
        this.promise = promise

        val activity = currentActivity
        if (activity == null) {
            promise.reject("ACTIVITY_NOT_FOUND", "Activity doesn't exist")
            return
        }

        // Check Camera Permissions
            if (ContextCompat.checkSelfPermission(activity, Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(activity, arrayOf(Manifest.permission.CAMERA), REQUEST_CAMERA_CODE)
                promise.reject("PERMISSION_DENIED", "Camera permission not granted")
                return
            }

        val photoFile = createImageFile()
        if (photoFile != null) {
            val photoURI = FileProvider.getUriForFile(
                activity,
                activity.applicationContext.packageName + ".provider",
                photoFile
            )
            val intent = Intent(android.provider.MediaStore.ACTION_IMAGE_CAPTURE)
            intent.putExtra(android.provider.MediaStore.EXTRA_OUTPUT, photoURI)

            currentPhotoPath = photoFile.absolutePath
            activity.startActivityForResult(intent, REQUEST_CAMERA_CODE)
        } else {
            promise.reject("FILE_CREATION_FAILED", "Unable to create file")
        }
    }

    private fun createImageFile(): File? {
        return try {
            val timeStamp = SimpleDateFormat("yyyyMMdd_HHmmss", Locale.getDefault()).format(Date())
            val storageDir = currentActivity?.getExternalFilesDir(Environment.DIRECTORY_PICTURES)
            File.createTempFile("JPEG_${timeStamp}_", ".jpg", storageDir)
        } catch (ex: Exception) {
            null
        }
    }

    override fun onActivityResult(activity: Activity?, requestCode: Int, resultCode: Int, data: Intent?) {
        if (requestCode == REQUEST_CAMERA_CODE) {
            if (resultCode == Activity.RESULT_OK) {
                promise?.resolve(currentPhotoPath)
            } else {
                promise?.reject("CAMERA_CANCELED", "Camera action was canceled")
            }
            promise = null
        }
    }

    override fun onNewIntent(intent: Intent?) {
        // No implementation needed
    }
}
