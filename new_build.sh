#/bin/bash
cd platforms/android
ant release
cd ../..
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore platforms/android/bin/DoesThisMakeMeLookFat-release-unsigned.apk alias_name
rm *.apk
zipalign -v 4 platforms/android/bin/DoesThisMakeMeLookFat-release-unsigned.apk DoesThisMakeMeLookFat.apk
echo 'DONE'
