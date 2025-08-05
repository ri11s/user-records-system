document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('userForm');
    const tableBody = document.querySelector('#usersTable tbody');

    // تحميل البيانات عند بدء الصفحة
    loadUsers();

    // إرسال النموذج
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        
        fetch('add_user.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                form.reset();
                loadUsers();
            } else {
                alert('Error: ' + data.message);
            }
        });
    });

    // تحميل المستخدمين من قاعدة البيانات
    function loadUsers() {
        fetch('get_users.php')
            .then(response => response.json())
            .then(users => {
                tableBody.innerHTML = '';
                users.forEach(user => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.age}</td>
                        <td>${user.status ? 'Active' : 'Inactive'}</td>
                        <td><button class="toggle-btn" data-id="${user.id}">Toggle</button></td>
                    `;
                    tableBody.appendChild(row);
                });

                // إضافة معالجات الأحداث لأزرار التبديل
                document.querySelectorAll('.toggle-btn').forEach(button => {
                    button.addEventListener('click', function() {
                        const userId = this.getAttribute('data-id');
                        toggleStatus(userId);
                    });
                });
            });
    }

    // تبديل حالة المستخدم
    function toggleStatus(userId) {
        fetch('toggle_status.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: userId })
        })
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                loadUsers();
            } else {
                alert('Error toggling status');
            }
        });
    }
});