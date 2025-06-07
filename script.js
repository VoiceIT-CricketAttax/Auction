// Initial state
let wallet = 250000000; // 25 Cr in paise
let currentBid = 20000000; // 2 Cr in paise
let minIncrement = 100000; // ₹1 Lakh in paise
let timerValue = 30;
let timerInterval = null;

const walletAmountEl = document.getElementById("walletAmount");
const currentPriceEl = document.getElementById("currentPrice");
const bidAmountEl = document.getElementById("bidAmount");
const highestBidderEl = document.getElementById("highestBidder");
const errorMessageEl = document.getElementById("errorMessage");
const timerEl = document.getElementById("timer");
const yourPlayerListEl = document.getElementById("yourPlayerList");

// Format paise to Cr
function formatMoney(paise) {
  return (paise / 10000000).toFixed(2) + " Cr";
}

// Update wallet display
function updateWalletDisplay() {
  walletAmountEl.textContent = formatMoney(wallet);
}

// Bid button logic
document.getElementById("increaseBid").addEventListener("click", () => {
  currentBid += minIncrement;
  bidAmountEl.textContent = formatMoney(currentBid);
});

document.getElementById("decreaseBid").addEventListener("click", () => {
  if (currentBid - minIncrement >= minIncrement) {
    currentBid -= minIncrement;
    bidAmountEl.textContent = formatMoney(currentBid);
  }
});

// Submit bid
document.getElementById("submitBid").addEventListener("click", () => {
  if (currentBid > wallet) {
    errorMessageEl.style.display = "block";
    errorMessageEl.textContent = "You don't have enough balance!";
    return;
  }

  highestBidderEl.textContent = "You";
  currentPriceEl.textContent = formatMoney(currentBid);
  errorMessageEl.style.display = "none";
});

// Buy player
document.getElementById("buyPlayerBtn").addEventListener("click", () => {
  if (currentBid > wallet) {
    errorMessageEl.style.display = "block";
    errorMessageEl.textContent = "Greedily bid and lost";
    return;
  }

  wallet -= currentBid;
  updateWalletDisplay();
  const li = document.createElement("li");
  li.textContent = document.getElementById("playerName").textContent + " - " + formatMoney(currentBid);
  yourPlayerListEl.appendChild(li);

  // Reset for next player
  highestBidderEl.textContent = "None";
  currentBid = 20000000;
  currentPriceEl.textContent = formatMoney(currentBid);
  bidAmountEl.textContent = formatMoney(currentBid);
  errorMessageEl.style.display = "none";
});

// Timer logic
function startTimer() {
  timerValue = 30;
  timerEl.textContent = timerValue;

  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timerValue--;
    timerEl.textContent = timerValue;

    if (timerValue <= 0) {
      clearInterval(timerInterval);
      document.getElementById("submitBid").disabled = true;
      document.getElementById("buyPlayerBtn").disabled = false;
    }
  }, 1000);
}

// Start timer initially
startTimer();
