// Плавная прокрутка к якорям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70, // компенсация высоты навбара
        behavior: 'smooth'
      });
    }
  });
});

// Данные об услугах (должны соответствовать ID строк в таблице)
const servicesData = {
  service1: {
    title: "Ежемесячное пособие на ребёнка",
    description: "Для малообеспеченных семей с детьми до 18 лет."
  },
  service2: {
    title: "Компенсация за ЖКХ",
    description: "Льготы на оплату коммунальных услуг для пенсионеров и инвалидов."
  },
  service3: {
    title: "Социальное сопровождение",
    description: "Помощь в решении бытовых и социальных вопросов."
  },
  service4: {
    title: "Выдача продуктовых наборов",
    description: "Для семей, оказавшихся в трудной жизненной ситуации."
  }
};

// Получаем элементы
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const closeBtn = document.querySelector(".close");
const applyButtons = document.querySelectorAll(".btn-apply");
const applicationForm = document.getElementById("application-form");

// Присваиваем data-service-id каждой кнопке (если не задан — используем порядковый номер)
applyButtons.forEach((btn, index) => {
  const row = btn.closest('tr');
  let serviceId = row.id || `service${index + 1}`;
  btn.setAttribute('data-service-id', serviceId);
});

// Открытие модального окна
applyButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const serviceId = btn.getAttribute("data-service-id");
    const service = servicesData[serviceId] || {
      title: "Услуга",
      description: "Описание услуги недоступно."
    };

    modalTitle.textContent = `Заявка: ${service.title}`;
    modalDescription.textContent = service.description;

    modal.style.display = "block";
  });
});

// Закрытие по крестику
closeBtn.onclick = () => {
  modal.style.display = "none";
};

// Закрытие по клику вне окна
window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// Обработка отправки формы
applicationForm.onsubmit = (e) => {
  e.preventDefault();

  const fullname = document.getElementById("fullname").value;
  const phone = document.getElementById("phone").value;

  // Здесь можно отправить данные на сервер (fetch, AJAX и т.д.)
  // Для демо — просто покажем сообщение

  alert(`Спасибо, ${fullname}!\nВаша заявка принята. С вами свяжутся по телефону ${phone}.`);

  // Сброс формы и закрытие окна
  applicationForm.reset();
  modal.style.display = "none";
};