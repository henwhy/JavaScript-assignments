let map = L.map("map");

map.setView([64.5, 26.0], 6);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let markers = L.markerClusterGroup({
    showCoverageOnHover: false,
    spiderfyOnMaxZoom: true,
    maxClusterRadius: 50
});

map.addLayer(markers);

fetch("courses.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Could not load courses.json");
        }
        return response.json();
    })
    .then(courses => {

        courses.forEach(course => {

            let marker = L.marker([course.lat, course.lng]);

            let popup = document.createElement("div");
            popup.className = "course-popup";

            let title = document.createElement("h3");
            title.textContent = course.course;
            popup.appendChild(title);

            function addDetail(label, value, href) {
                if (!value) return;

                let paragraph = document.createElement("p");

                let strong = document.createElement("strong");
                strong.textContent = label + ": ";
                paragraph.appendChild(strong);

                if (href) {
                    let link = document.createElement("a");
                    link.textContent = value;
                    link.href = href;
                    link.target = "_blank";
                    link.rel = "noopener noreferrer";
                    paragraph.appendChild(link);
                } else {
                    paragraph.appendChild(document.createTextNode(value));
                }

                popup.appendChild(paragraph);
            }

            addDetail("📍", course.address);
            addDetail("📞", course.phone);

            if (course.email) {
                addDetail("✉️", course.email, "mailto:" + course.email);
            }

            if (course.web) {
                let website = course.web;

                try {
                    let url = new URL(website);

                    if (url.protocol === "http:" || url.protocol === "https:") {
                        addDetail("🌐", website, url.href);
                    }
                } catch (error) {
                    console.warn("Invalid website address:", website);
                }
            }

            if (course.text) {
                let description = document.createElement("p");
                description.className = "description";
                description.textContent = course.text;
                popup.appendChild(description);
            }

            marker.bindPopup(popup, {
                closeButton: true,
                maxWidth: 320
            });

            markers.addLayer(marker);
        });

    })
    .catch(error => {
        console.error("Error loading golf courses:", error);
        alert("Could not load the golf courses. Check courses.json and the browser console.");
    });