import React, { useEffect } from 'react'
import $ from 'jquery'; 

export default function ProfilePicture() {
    useEffect(() => {
        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    $('#imagePreview').css('background-image', 'url('+e.target.result +')');
                    $('#imagePreview').hide();
                    $('#imagePreview').fadeIn(650);
                }
                reader.readAsDataURL(input.files[0]);
            }
        }
        $("#imageUpload").change(function() {
            readURL(this);
        });
    }, [])
    return (
        <div className="profpic">
            <div className="container">
                <div className="avatar-upload">
                    <div className="avatar-edit">
                        <input type='file' id="imageUpload" accept=".png, .jpg, .jpeg" />
                        <label for="imageUpload"></label>
                    </div>
                    <div className="avatar-preview">
                        <div id="imagePreview">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
