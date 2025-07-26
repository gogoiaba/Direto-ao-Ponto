# Direto ao Ponto

Direto ao Ponto is a small web application to help track your working hours.
It runs completely in the browser with no server component.

## Opening the app

Open `index.html` in your favorite web browser. You can double-click the file or
launch a simple local server (for example `npx serve` or `python3 -m http.server`)
and navigate to the page.

## Features

- **Choose your work day** – select between a 6 hour or 8 hour schedule.
- **Add time entries** – use the `+` button to insert new Entrada/Saída rows.
- **Clear the form** – the *Limpar Horários* button removes extra rows and
  resets all inputs.
- **Complete missing time** – fill three of the four times and press
  *Completar Horário* to automatically calculate the remaining value so that
  the net worked time equals 5h45 (for a 6 hour day) or 8h.

## Future improvements

- Implement the *Verificar Jornada* button to validate if the inserted times
  respect the required breaks.
- Show warnings when the lunch interval is too short.
- Allow removing specific time entry lines.
- Persist entries locally between sessions and improve the overall look and
  responsiveness.
